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

function displayWeather(data) {
    const todayTemp = document.querySelector("#todayWeather .temp");
    const todayCloudCover = document.querySelector("#todayWeather .cloudCover");
    const todayVisibility = document.querySelector("#todayWeather .visibility");

    todayTemp.innerHTML += `${data.hourly.temperature_2m[0]} ${data.hourly_units.temperature_2m}`;
    todayCloudCover.innerHTML += `${data.current.cloud_cover} ${data.current_units.cloud_cover}`;

    if (data.hourly.visibility[0] < 1000) {
        todayVisibility.innerHTML += ' Foggy ';
    } else {
        todayVisibility.innerHTML += ' Clear ';
    }

    for (let i = 1; i < 6; i++) {
        const hrTemp = document.querySelector(`#hrWeather\\[${i}\\] .temp`);
        const hrCloudCover = document.querySelector(`#hrWeather\\[${i}\\] .cloudCover`);
        const hrVisibility = document.querySelector(`#hrWeather\\[${i}\\] .visibility`);

        if (hrTemp) {
            hrTemp.innerHTML += `${data.hourly.temperature_2m[i]} ${data.hourly_units.temperature_2m}`;
        }
        if (hrCloudCover) {
            hrCloudCover.innerHTML += `${data.current.cloud_cover} ${data.current_units.cloud_cover}`;
        }

        if (data.hourly.visibility[i] < 1000) {
            if (hrVisibility) {
                hrVisibility.innerHTML += ' Foggy ';
            } else {
                hrVisibility.innerHTML += ' Clear ';
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    
        getLocation(geoLocation, zipCode).then(function (data) {
            console.log(data);
            fetchWeatherData(data.lat, data.lon);


        })
    
    })
