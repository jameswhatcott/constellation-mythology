//--------------------API for Weather----------------------------

let params = new URLSearchParams(document.location.search);
let geoLocation = params.get("geolocation");
let zipCode = params.get("zipcode");

function fetchWeatherData(lat, lon) {
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=31.328358&longitude=-94.653306&current=temperature_2m,cloud_cover&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,visibility&temperature_unit=fahrenheit&timezone=America%2FChicago&forecast_days=1`;
    
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
    const todayTime = document.querySelector(".time");
    const todayTemp = document.querySelector("#todayWeather .temp");
    const todayCloudCover = document.querySelector("#todayWeather .cloudCover");
    const todayVisibility = document.querySelector("#todayWeather .visibility");

   
    function convertISOToNormalTime(isoTime) {
        const date = new Date(isoTime);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return date.toLocaleString('en-US', options);
    }
    
    const isoTime = data.current.time;
    const normalTime = convertISOToNormalTime(isoTime);

    todayTime.innerHTML = normalTime;
    todayTemp.innerHTML += `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    todayCloudCover.innerHTML += `${data.current.cloud_cover} ${data.current_units.cloud_cover}`;

    if (data.hourly.visibility[0] < 1000) {
        todayVisibility.innerHTML += ' Foggy ';
    } else {
        todayVisibility.innerHTML += ' Clear ';
    }

    for (let i = 1; i < 7; i++) {
        const hrTemp = document.querySelector(`#hrWeather\\[${i}\\] .temp`);
        const hrCloudCover = document.querySelector(`#hrWeather\\[${i}\\] .cloudCover`);
        const hrVisibility = document.querySelector(`#hrWeather\\[${i}\\] .visibility`);

        if (hrTemp) {
            hrTemp.innerHTML += `${data.hourly.temperature_2m[i]} ${data.hourly_units.temperature_2m}`;
        }
        if (hrCloudCover) {
            hrCloudCover.innerHTML += `${data.current.cloud_cover} ${data.current_units.cloud_cover}`;
        }

        if (hrVisibility) {
            if (data.hourly.visibility[i] < 1000) {
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
