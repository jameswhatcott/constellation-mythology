//JavaScript file for the Astronomy API
const authString = btoa(`applicationId:applicationSecret`);

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
            console.log(data);
            processStarChartData(data);
        })
        .catch(error => {
            console.error('Error getting data')
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
});
//==================================
