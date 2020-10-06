"use strict";

const weather = document.querySelector(".weather");
const API_KEY = "9f34b7e74800cba8ec69853e3618dfa7";
const COORDS = "Coords";

function init() {
  loadCoords();
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}

function geoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const localCoords = {
    latitude,
    longitude,
  };

  saveCoords(localCoords);
  getWeather(latitude, longitude);
}

function saveCoords(localCoords) {
  localStorage.setItem(COORDS, JSON.stringify(localCoords));
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${API_KEY}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = json.main.temp;
      const main = json.weather[0].main;
      weather.innerHTML = `${temperature} &deg;C ${main}`;
    });
}

function geoError() {
  alert("주소를 가져올 수 없습니다.");
}

init();
