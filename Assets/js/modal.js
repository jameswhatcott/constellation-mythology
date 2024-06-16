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
  // fixes a limitation in jQuery UI dialog boxes wherein they do not recenter if the viewport size changes
  $(window).resize(function() {
    $("#locOptionsSet").dialog("option", "position", {my: "center", at: "center", of: window});
  });

  // selects "Postal Code" radio button if user changes the zip code input box
  zipInput.addEventListener("input", (function() {
    zipLocEl.click() // I used this instead of changing the state to true because changing the state does not invoke the jQuery UI functions to visually activate the radio button
  }));
  
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