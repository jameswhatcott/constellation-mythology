//JavaScript file for the Astronomy API
const apiKey = '7981e824-0c2d-4e2b-bb9b-71c6acd7b32c';
const apiSecret = '5a0bba4bfb658609c5f6bbe23536169e435f36ca3589bd2e8bc5de8571c90e4edaa38067801da07293d2b0771ae0a5e3c6a72fb98384cec4d942e4ea963c183d8eb63f6f6ee0a21b14efb2246f4e36eea247ea78f50933e0674eea32131dd71acb60185f6f19105632da091e957c6e85';
const authString = btoa(`${apiKey}:${apiSecret}`);


    

function getStarChart(lat, lon) {
    const url = 'https://api.astronomyapi.com/api/v2/studio/star-chart';
    const currentDate = new Date().toISOString().split('T')[0];
    const skyImage = document.getElementById('skyImage');
    const loading = document.getElementById('loading');

    loading.style.display = 'flex';
    skyImage.classList.add('hidden');

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Authorization": `Basic ${authString}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "observer": {
                "latitude": lat,
                "longitude": lon,
                "date": currentDate,
            },
            "view": {
                "type": "area",
                "parameters": {
                    "position": {
                        "equatorial": {
                            "rightAscension": 0,
                            "declination": 0,
                        }
                    },
                    "zoom": 3
                }
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error');
        }
        return response.json();
    })
    .then(data => {
        console.log('API response', data);
        const skyImageUrl = data.data.imageUrl;

        skyImage.src = skyImageUrl;
        skyImage.onload = () => {
            loading.style.display = 'none';
            skyImage.classList.remove('hidden');
        };
    })
    .catch(error => {
        console.error('Error getting data', error);
        loading.textContent = 'Error loading image.';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getLocation(geoLocation, zipCode).then(function(data) {
        getStarChart(lat, lon);
    });
});

