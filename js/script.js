document.addEventListener('DOMContentLoaded', () => {
const API = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&APPID=460f31a80dd19df054a942b935076fe5&units=metric';

const DATE = new Date();
const DHOURS = new Date();


let getWeatherData = () => {

    if (localStorage.getItem('hours') && (DATE.getHours() - localStorage.getItem('hours')) < 2 ) {

        let itemCity = localStorage.getItem("City");
        let itemCelcius = localStorage.getItem("Celcius");
        const CARD = document.querySelector('.card');
        CARD.innerHTML = `
            <div class="city">
                <span>${itemCity}</span>
            </div>
            <div class="celcius">
                <span>${Math.floor(itemCelcius)}&#8451;</span>
            </div>`
    }

    else if (localStorage.getItem('hours') === null || (DATE.getHours() - localStorage.getItem('hours')) >= 2) {

        localStorage.setItem('hours', DHOURS.getHours());
    fetch(API)
    .then((response) => response.json())
    .then((data) => {
        getWeatherCard(data);
        console.log(data.name);
        console.log(data.main.temp)
    })
    .catch((error) => {
        console.log(error);
    });

    }
}

let getWeatherCard = (data) => {
    const CITY = data.name;
    const CELCIUS = Math.floor(data.main.temp);
    const CARD = document.querySelector('.card');
    localStorage.setItem(`City`, data.name);
    localStorage.setItem(`Celcius`, data.main.temp);
    CARD.innerHTML = `
          <div class="city">
            <span>${CITY}</span>
          </div>
          <div class="celcius">
            <span>${CELCIUS}&#8451;</span>
          </div>`
}

getWeatherData();

});