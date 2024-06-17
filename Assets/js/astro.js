//JavaScript file for the Astronomy API
const apiKey = '7981e824-0c2d-4e2b-bb9b-71c6acd7b32c';
const apiSecret = '5a0bba4bfb658609c5f6bbe23536169e435f36ca3589bd2e8bc5de8571c90e4edaa38067801da07293d2b0771ae0a5e3c6a72fb98384cec4d942e4ea963c183d8eb63f6f6ee0a21b14efb2246f4e36eea247ea78f50933e0674eea32131dd71acb60185f6f19105632da091e957c6e85';
const authString = btoa(`${apiKey}:${apiSecret}`);

// Function to fetch star chart
function getStarChart(lat, lon) {
    const url = `https://api.astronomyapi.com/api/v2/studio/star-chart`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authString}`,
        },
        body: JSON.stringify({
            "observer": {
                "latitude": lat,
                "longitude": lon,
                "date": "2019-12-20"
            },
            "view": {
                "type": "area",
                "parameters": {
                    "position": {
                        "equatorial": {
                            "rightAscension": 14.83,
                            "declination": -15.23
                        }
                    },
                    "zoom": 3 //optional
                }
            }
        }
            //{
            // 'observer': {
            //     'latitude': `33.775867`,
            //     'longitude': `-84.39733`,
            //     'date': `2024-06-17`
            // },
            // 'view': {
            //     'type': 'area',
            //     'parameters': {
            //         'position': {
            //             'equatorial': {
            //                 'rightAscension': 14.83,
            //                 'declination': -15.23
            //             }
            //         },
            //         'zoom': 3
            //     }
            //}
        //}
        )
   }
   )
    .then(response => {
        if (!response.ok) {
            throw new Error('Network Error');
        }
        return response.json();
    })
    .then(data => {
        console.log('API response', data);
    })
    .catch(error => {
        console.error('Error getting data', error);
    });
}

// Function to display star chart
function displayStarChart(data) {
    const skyImage = document.getElementById('skyImage');
    if (data.data && data.data.imageUrl) {
        skyImage.setAttribute('src', data.data.imageUrl);
        skyImage.setAttribute('alt', 'Sky Image');
    } else {
        skyImage.textContent = 'No image available';
    }
}

// Fetch lat, lon, and date from localStorage and call getStarChart
document.addEventListener('DOMContentLoaded', function() {
    getLocation(geoLocation, zipCode).then(function (data) {
        getStarChart(data.lat, data.lon);
})
});
