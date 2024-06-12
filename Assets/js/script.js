// script.js
import {lat, lon} from "./geolocation";
document.addEventListener('DOMContentLoaded', function() {

//--------------------- API for weather-----------------------------------------

const form = document.getElementById("myForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    
        fetchWeatherData(city);
    
});

function fetchWeatherData(city) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=cloud_cover&hourly=temperature_2m,precipitation_probability,precipitation,visibility&temperature_unit=fahrenheit&forecast_days=1`;
    
    fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayWeatherData(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }






});



