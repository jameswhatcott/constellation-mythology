//JavaScript file for the Astronomy API
document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://api.astronomyapi.com/api/v2/studio/star-chart';

    //Fetches API
    fetch(url)
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
        const resultConatiner = document.getElementById('resultContainer');
        resultConatiner.textContent = JSON.stringify(data, null, 2)
    }
});