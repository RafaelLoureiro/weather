document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault();

    let inputSearchWeather = document.querySelector('#searchWeatherInput').value;

    if (inputSearchWeather !== '') {
        clearInformation();
        showWarning('Carregando...');

        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputSearchWeather)}&appid=ef43bd9c7ac2a06fe53a861a85416490&units=metric&lang=en`;

        let resultsSearch = await fetch(urlWeather);
        let jsonList = await resultsSearch.json();

        if (jsonList.cod === 200) {
            showResultInformation({
                name: jsonList.name,
                country: jsonList.sys.country,
                temp: jsonList.main.temp,
                tempIcon: jsonList.weather[0].icon,
                windSpeed: jsonList.wind.speed,
                windAngle: jsonList.wind.deg
            });
        }
    } else {
        clearInformation();
        showWarning('No results at location!');
    }
});
function showResultInformation(json) {
    showWarning('');
    document.querySelector('.titleCity').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.temperatureNow').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.windNow').innerHTML = `${json.windSpeed}<span>Km/h</span>`;
    document.querySelector('.informationTemperature img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.windToPoint').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.resulWeather').style.display = 'block';
}
function clearInformation() {
    showWarning('');
    document.querySelector('.resulWeather').style.display = 'none';
}

function showWarning(message) {
    document.querySelector('.warning').innerHTML = message;
}



