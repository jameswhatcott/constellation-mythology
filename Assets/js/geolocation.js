  // I'm imagining this as a radio button with geolocation and zip-code options.
  // The zip code option also includes an input box for the user to provide a zip code.
  // In the code below, I've just made up names and IDs for the radio buttons and the input box.
  // locatorOpt is my name for both radio buttons (so that only one can be picked at a time)
  // geoLocEl is my id for the geolocation option.
  
let lat = ""; // these need to be global variables to pass out of the .then statements
let lon = "";
const submitBtn = document.getElementById("submitBtn");
const geoLocEl = document.getElementById("geoLocEl");
const zipLocEl = document.getElementById("zipLocEl");

geoLocEl.checked = true;

function getLocation() {
  if (geoLocEl.checked) { // geolocation option chosen by user
    if ("geolocation" in navigator) { // test to see if geolocation is supported by browser
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        });
      });
    } else { // the browser does not support geolocation
      alert("Your brower does not support geolocation. Try a different browser.")
      return Promise.reject("Geolocation not supported.");
    };
  };

  if (zipLocEl.checked) { // zip-code option is chosen by the user
    const searchZip = document.querySelector("#zipInput").value;
    if (searchZip === "") {
      alert("Please provide a zip code.");
      return Promise.reject("Zip code not provided.");
    } else {
      return fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${searchZip}&key=AIzaSyAkxUKm1ntgvpMBIPdmwi_lx8nib9Bfaiw`) //Matthew's Google Maps API key
        .then ((response) => response.json())
        .then (function (coordinatesObj) {
          lat = coordinatesObj.results[0].geometry.location.lat;
          lon = coordinatesObj.results[0].geometry.location.lng;
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


submitBtn.addEventListener("click", function(event) {
  handleLocation();
});


// need an event listner that changes radio button to postal code option 
// if anything entered into zip code input

// need to reset zip-code input to ""