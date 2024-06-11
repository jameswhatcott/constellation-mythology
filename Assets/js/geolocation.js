let lat = ""; // these need to be global variables to pass out of the .then statements
let lon = "";

function getLocation() {
  // I'm imagining this as a radio button with geolocation and zip-code options.
  // The zip code option also includes an input box for the user to provide a zip code.
  // In the code below, I've just made up names and IDs for the radio buttons and the input box.
  // locatorOpt is my name for both radio buttons (so that only one can be picked at a time)
  // geoLocEl is my id for the geolocation option.
  
  if (document.getElementById("geoLocEl").checked) {
    if (navigator.geolocation) { // geolocation option chosen by user
      navigator.geolocation.getCurrentPosition(showPosition);
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    } else { // no results returned, likely because the browser does not support geolocation
      alert("Your brower does not support geolocation. Try a different browser.");
      return;
    }
  } else { // if zip-code option is chosen by the user
  searchZip = document.getElementById("zipInput")
  // fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${searchZip}&key=AIzaSyAkxUKm1ntgvpMBIPdmwi_lx8nib9Bfaiw`) //Matthew's Google Maps API key
  fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=43212&key=AIzaSyAkxUKm1ntgvpMBIPdmwi_lx8nib9Bfaiw`) //Matthew's Google Maps API key; zip code for testing only; use line above for variable
  .then (function (coordinates) {
    return coordinates.json()
  })
  .then (function (coordinatesObj) {
    lat = coordinatesObj.results[0].geometry.location.lat;
    lon = coordinatesObj.results[0].geometry.location.lng;
  });
}

getLocation();