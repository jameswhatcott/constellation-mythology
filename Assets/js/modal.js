$(function() {
  $( "#locOptions").buttonset();
});

function getLocation() {
  if (geoLocEl checked) {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      //is the above returning two value or an array? If an array, what's the array's name?
      });
    }
} else {
  let lat = "";
  let lng = "";
  let address = {zipcode};
  geocoder.geocode ({'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
      fetch ("https://maps.googleapis.com/maps/api/geocode/json?key=YOUR_API_KEY&components=postal_code:97403")


      }
  });
};