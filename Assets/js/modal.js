function getLocation() {
  // if geolocation option chosen by user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { // no results returned
      alert("Your brower does not support geolocation. Try a different browser.");
      return;
    }
  // } else { // zip code option chosen by user
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


document.addEventListener('DOMContentLoaded', function() {
    
  const form = document.getElementById("myForm");
  if (form) {
  form.addEventListener("submit", (event) => {
      event.preventDefault();
      const geo = geoLocEl.checked; 
      const searchZip = document.querySelector("#zipInput").value;
      window.location.href = `results.html?geolocation=${geo}&zipcode=${searchZip}`
      

    
  
  })}})
