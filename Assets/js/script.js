//--------------------API for Weather----------------------------

let params = new URLSearchParams(document.location.search);
let geoLocation = params.get("geolocation");
let zipCode = params.get("zipcode");

function fetchWeatherData(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,visibility&temperature_unit=fahrenheit&timezone=auto&forecast_days=1`;

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

    const currentTime = new Date();
    const normalTime = convertISOToNormalTime(currentTime.toISOString());
    todayTime.innerHTML = normalTime;
    todayTemp.innerHTML += `${data.current_weather.temperature} ${data.hourly_units.temperature_2m}`;
    todayCloudCover.innerHTML += `${data.current_weather.cloudcover} %`;

    if (data.current_weather.visibility < 1000) {
        todayVisibility.innerHTML += ' Foggy ';
    } else {
        todayVisibility.innerHTML += ' Clear ';
    }

    const currentHour = currentTime.getHours();
    const startIndex = data.hourly.time.findIndex(time => new Date(time).getHours() === currentHour);

    for (let i = 0; i < 6; i++) {
        const hourIndex = startIndex + i;
        const hrTemp = document.querySelector(`#hrWeather\\[${i + 1}\\] .temp`);
        const hrCloudCover = document.querySelector(`#hrWeather\\[${i + 1}\\] .cloudCover`);
        const hrVisibility = document.querySelector(`#hrWeather\\[${i + 1}\\] .visibility`);

        if (hrTemp && data.hourly.temperature_2m[hourIndex] !== undefined) {
            hrTemp.innerHTML = `${data.hourly.temperature_2m[hourIndex]} ${data.hourly_units.temperature_2m}`;
        }
        if (hrCloudCover && data.hourly.cloudcover[hourIndex] !== undefined) {
            hrCloudCover.innerHTML = `${data.hourly.cloudcover[hourIndex]} %`;
        }

        if (hrVisibility && data.hourly.visibility[hourIndex] !== undefined) {
            if (data.hourly.visibility[hourIndex] < 1000) {
                hrVisibility.innerHTML = ' Foggy ';
            } else {
                hrVisibility.innerHTML = ' Clear ';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getLocation(geoLocation, zipCode).then(function (data) {
        console.log(data);
        fetchWeatherData(data.lat, data.lon);
    });
});
