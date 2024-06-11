let lat = ""; // these need to be global variables to pass out of the .then statements
let lon = "";

const submitBtn = document.getElementById("submitBtn")

document.getElementById("geoLocEl").checked = true
function getLocation() {
  // I'm imagining this as a radio button with geolocation and zip-code options.
  // The zip code option also includes an input box for the user to provide a zip code.
  // In the code below, I've just made up names and IDs for the radio buttons and the input box.
  // locatorOpt is my name for both radio buttons (so that only one can be picked at a time)
  // geoLocEl is my id for the geolocation option.
  
  if (document.getElementById("geoLocEl").checked) {
    if (navigator.geolocation) { // geolocation option chosen by user
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { // no results returned, likely because the browser does not support geolocation
      alert("Your brower does not support geolocation. Try a different browser.");
      return;
    }
  } else { // if zip-code option is chosen by the user
    const searchZip = document.querySelector("#zipInput").value
    if (searchZip === "") {
      alert("Please supply a zip code.")
      return;
    }
    fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${searchZip}&key=AIzaSyAkxUKm1ntgvpMBIPdmwi_lx8nib9Bfaiw`) //Matthew's Google Maps API key
    .then (function (coordinates) {
      return coordinates.json()
    })
    .then (function (coordinatesObj) {
      lat = coordinatesObj.results[0].geometry.location.lat;
      lon = coordinatesObj.results[0].geometry.location.lng;
    });
  };
  console.log(lat + ", " + lon)
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}


//need an event listner that changes radio button to postal code option 
// if anything entered into zip code input
submitBtn.addEventListener("click", getLocation);