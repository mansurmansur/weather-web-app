"use strict";

//elements
const mainEL = document.querySelector(".main");
const cardEL = document.querySelector(".weather-update");
const formEL = document.querySelector(".searchForm");
const searchEL = document.querySelector("#search");

formEL.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchEL.value;

  if (city) {
    getWeather(city);

    searchEL.value = "";
  }
});

//utility functions
let createCardEL = (location, temprature, st, pressure, humidity) => {
  let cardHTML = `
        <div class="location-text">
            <span class="address">${location}</span>
        </div>
        <div class="temperature">
            <span class="current">${temprature} &deg; F</span>
            <span class="status">${st}</span>
            <span class="other-info">
                <span class="pressure">Pressure: ${pressure}</span>
                <span class="humidity">Humidity: ${humidity} &deg; F</span>
            </span>
        </div>
    `;
  cardEL.innerHTML = cardHTML;

  return cardEL;
};

//get weather
function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&appid=808e9075ff6d85540457c5469045f2ad`
  )
    .then((response) => response.json())
    .then((data) => {
      //call create card
      createCardEL(
        data.name,
        data.main.temp,
        data.weather[0].description,
        data.main.pressure,
        data.main.humidity
      );
    });
}
