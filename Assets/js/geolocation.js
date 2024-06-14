let lat = ""; // these need to be global variables to pass out of the .then statements
let lon = "";

const submitBtn = document.getElementById("submitBtn");
const geoLocEl = document.getElementById("geoLocEl");
const zipLocEl = document.getElementById("zipLocEl");

if (geoLocEl) {
  geoLocEl.checked = true;
}

// find user location using their preferred method: geolocation or zip code
function getLocation(geoLocation, zipCode) {
  console.log(geoLocation);
  if (geoLocation == "true") { // geolocation option chosen by user
    if ("geolocation" in navigator) { // test to see if geolocation is supported by browser
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({lat: position.coords.latitude, lon: position.coords.longitude});
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        });
      });
    } else { // the browser does not support geolocation
      alert("Your brower does not support geolocation. Try a different browser.")
      return Promise.reject("Geolocation not supported.");
    };
  };

  if (zipCode) { // zip-code option is chosen by the user
    if (zipCode === "" || zipCode.length != 5) {
      alert("Please provide a zip code.");
      return Promise.reject("Zip code not provided.");
    } else {
      return fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyAkxUKm1ntgvpMBIPdmwi_lx8nib9Bfaiw`) //Matthew's Google Maps API key
        .then ((response) => response.json())
        .then (function (coordinatesObj) {
          lat = coordinatesObj.results[0].geometry.location.lat;
          lon = coordinatesObj.results[0].geometry.location.lng;
          return Promise.resolve({lat, lon});
        }
      );
    }
  }
}

async function handleLocation() {
  try {
    const position = await getLocation();
  } catch (error) {
    console.error(error);
  }
  console.log(lat + ", " + lon)
}


if (submitBtn) {
  submitBtn.addEventListener("click", function(event) {
    handleLocation();
  });
}