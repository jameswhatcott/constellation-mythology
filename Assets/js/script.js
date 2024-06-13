//--------------------API for Weather----------------------------

let params = new URLSearchParams(document.location.search);
let geoLocation = params.get("geolocation");
let zipCode = params.get("zipcode");

function fetchWeatherData(lat, lon) {
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=cloud_cover&hourly=temperature_2m,precipitation_probability,precipitation,visibility&temperature_unit=fahrenheit&forecast_days=1`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log data to console
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            
            // Ensure weatherResult is defined or exists in your HTML
            const weatherResult = document.getElementById("weatherResult");
            if (weatherResult) {
                weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            }
        });
}

function displayWeather (data) {
    const weather = document.getElementById("weatherResult");
    const weatherHead = document.getElementById("")
    weather.innerHTML 
}


document.addEventListener('DOMContentLoaded', function() {
    
        getLocation(geoLocation, zipCode).then(function (data) {
            console.log(data);
            fetchWeatherData(data.lat, data.lon);


        })
    
    })
