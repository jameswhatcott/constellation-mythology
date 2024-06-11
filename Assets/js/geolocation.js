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

getLocation();

  