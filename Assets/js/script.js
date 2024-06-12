//

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
    weather.innerHTML = data.current.cloud_cover
}


document.addEventListener('DOMContentLoaded', function() {

    //--------------------- API for weather-----------------------------------------

    const form = document.getElementById("myForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        getLocation().then(function (data) {
            console.log(data);
            fetchWeatherData(data.lat, data.lon);

        })
    });

    

});
