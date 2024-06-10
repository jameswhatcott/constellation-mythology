// script.js
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close")[0];

    // Show the modal automatically when the page loads
    modal.style.display = "block";

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

//--------------------- API for weather-----------------------------------------

const form = document.getElementById("myForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
        localStorage.setItem("lastCity", city);
    }
});

function fetchWeatherData(city) {
    const lat = 
    const lon = 
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=cloud_cover&hourly=temperature_2m,precipitation_probability,precipitation,visibility&temperature_unit=fahrenheit&forecast_days=1`;
    
    fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherResult.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }




});



