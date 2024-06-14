//JavaScript file for the Astronomy API
const apiKey = '7981e824-0c2d-4e2b-bb9b-71c6acd7b32c';
const apiSecret = '5a0bba4bfb658609c5f6bbe23536169e435f36ca3589bd2e8bc5de8571c90e4edaa38067801da07293d2b0771ae0a5e3c6a72fb98384cec4d942e4ea963c183d8eb63f6f6ee0a21b14efb2246f4e36eea247ea78f50933e0674eea32131dd71acb60185f6f19105632da091e957c6e85';
const authString = btoa(`${apiKey}:${apiSecret}`);
//==================================
document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://api.astronomyapi.com/api/v2/studio/star-chart';

    //Fetches API
    fetch(url, {
        headers: {
            'Authorization': `Basic ${authString}`
        }
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(data => {
            console.log('API response', data);
            processStarChartData(data);
        })
        .catch(error => {
            console.error('Error getting data', error)
        });
    function processStarChartData(data) {
        const skyImage = document.getElementById('skyImage');
        if (data.image_url) {
            skyImage.setAttribute('src', data.image_url);
            skyImage.setAttribute('alt', 'Sky Image');
        } else {
            skyImage.textContent = 'No image';
        }
    }
    function displayStarChart(data) {
        const constellationsList = document.getElementById('constellationsList');
        constellationsList.innerHTML = '';

        if (data.constellations && data.constellations.length > 0) {
            data.constellations.forEach(constellation => {
                const constellationItem = document.createElement('li');
                constellationsItem.textContent = constellation.name;
                constellationList.appendChild(constellationItem);
            });
        } else {
            constellationList.textContent = 'No constellations'
        }
    }
});
//==================================
