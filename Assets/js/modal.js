function getLocation() {
  // if geolocation option chosen by user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { // no results returned
      alert("Your brower does not support geolocation. Try a different browser.");
      return;
    }
  }

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude = " + lat + "; Longitude = " + lon);
}

document.addEventListener("onload", getLocation());

//-----------------------------------------------------------------------------

const geoLocEl = document.getElementById("geoLocEl");
const zipLocEl = document.getElementById("zipLocEl");
const zipInputEl = document.getElementById("zipInput");

document.addEventListener('DOMContentLoaded', function() {
  $(window).resize(function() {
    $("#locOptionsSet").dialog("option", "position", {my: "center", at: "center", of: window});
  });
  const form = document.getElementById("myForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const geo = geoLocEl.defaultChecked; 
      const searchZip = document.querySelector("#zipInput").value;
      if (zipLocEl.checked) {
        if (searchZip === "" || searchZip.length !== 5) {
          alert ("Please provide a zip code.");
          return Promise.reject("Zip code not provided.");
        }
      }
    window.location.href = `results.html?geolocation=${geo}&zipcode=${searchZip}`
    })
  }
})