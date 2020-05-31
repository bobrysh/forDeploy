import '../css/style.css';
import { makeHTML } from './makeHTML';

makeHTML();

let lang; let temperatureText;
let currentCity = 'Vorkuta';
let apparentTemperature;
let currentTemperature; 
let dayOne; 
let dayTwo; 
let dayThree;
let weatherApiURL; 
let coordinatesApiURL; 


const currentLanguage = document.querySelector('#language');
const buttonTemperature = document.querySelector('#temperature');

const languageURL = ['en', 'ru', 'be'];
const languageDate = ['en-US', 'ru-RU', 'ru-RU'];



const weatherParameters = [
  ['Perceived temperature: ', 'Ощущается как: ', 'Якая адчуваецца тэмпература: '],
  ['Weather description: ', 'Погода: ', 'Апісанне надвор`я: '],
  ['Wind speed(m/s): ', 'Скорость ветра(м/с): ', 'Хуткасць ветру(м/с): '],
  ['Humidity(%): ', 'Влажность воздуха(%): ', 'Вільготнасць(%): ']
];

const coordinatesNames = [
  ['Latitude: ', 'Широта: ', 'Шырата: '],
  ['Longitude: ', 'Долгота: ', 'Даўгата: ']
];

  lang = 0;
  currentLanguage.textContent = 'En';
  temperatureText = 'C';
  buttonTemperature.textContent = 'C';





  async function getWeatherForecast() {
    weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&lang=${languageURL[lang]}&units=metric&APPID=9e6da5e116f6b026eff42627fb289a55`;
    const response = await fetch(weatherApiURL);
    const data = await response.json();

    const time = new Date();
    const timezone = (data.city.timezone / 3600) - 3;
    const hour = time.getHours() + timezone;
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    const minute = time.getMinutes();
    const second = time.getSeconds();


    const newTime = new Date(year, month, day, hour, minute, second);

    (async function () {

      let timeOfTheYear; let timesOfDay;
      const weather = data.list[0].weather[0].main;
  
      if ([11, 0, 1].indexOf(month) !== -1) {
        timeOfTheYear = 'Winter';
      }
      if ([2, 3, 4].indexOf(month) !== -1) {
        timeOfTheYear = 'Spring';
      }
      if ([5, 6, 7].indexOf(month) !== -1) {
        timeOfTheYear = 'Summer';
      }
      if ([8, 9, 10].indexOf(month) !== -1) {
        timeOfTheYear = 'Autumn';
      }
  
      const hours = newTime.getHours();
      if ([0, 1, 2, 3, 4, 5].indexOf(hours) !== -1) {
        timesOfDay = 'Night';
      }
      if ([6, 7, 8, 9, 10, 11].indexOf(hours) !== -1) {
        timesOfDay = 'Morning';
      }
      if ([12, 13, 14, 15, 16, 17].indexOf(hours) !== -1) {
        timesOfDay = 'Day';
      }
      if ([18, 19, 20, 21, 22, 23].indexOf(hours) !== -1) {
        timesOfDay = 'Evening';
      }
  
      const imgURL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${timeOfTheYear},${timesOfDay},${weather}&client_id=xnL6SnyJRPRVbjPKJopaTegmirf4Qpe6RQjjqXrY-0g`;
  
      (async function () {
        const wrapper = document.querySelector('#wrapper');
  
        const responseImg = await fetch(imgURL);
        const dataImg = await responseImg.json();
  
        wrapper.style.backgroundImage = `url('${dataImg.urls.regular}')`;
        wrapper.style.backgroundRepeat = 'no-repeat';
        wrapper.style.backgroundSize = 'cover';
      })();
    })();

    (async function Timer() {
      const currentTime = document.querySelector('#currentTime');
      const h = newTime.getHours();
      const m = newTime.getMinutes();
      let s = newTime.getSeconds();
    
      if (s < 10) {
        s = `0${m}`;
      }
  
      currentTime.textContent = `${h  }:${  m}:${  s}`;
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const localeDate = newTime.toLocaleString(languageDate[lang], options);
      currentDate.textContent = localeDate;
      
      // setInterval(() => Timer(), 1000);
    })();

    function getFutureTemperature(startPos) {
      const start = startPos;
      const end = start + 8;
      let acc = 0;
      for (let i = start; i < end; i++) {
        acc += data.list[i].main.temp;
      }
      return Math.round(acc / 8);
    }

    currentTemperature = Math.round(data.list[0].main.temp);
    document.querySelector('#currentTemperature').textContent = currentTemperature;
  
    apparentTemperature = Math.round(data.list[0].main.temp_kf);
    document.querySelector('#apparentTemperature').textContent = weatherParameters[0][lang] + apparentTemperature;
  
    const windSpeed = Math.round(data.list[0].wind.speed);
    document.querySelector('#wind_speed').textContent = weatherParameters[2][lang] + windSpeed;

    const weatherDescription = data.list[0].weather[0].description;
    document.querySelector('#weather_description').textContent = weatherParameters[1][lang] + weatherDescription;
  
    const {humidity} = data.list[0].main;
    document.querySelector('#humidity').textContent = weatherParameters[3][lang] + humidity;

    const imgURL = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    document.querySelector('#weather_icon').src = imgURL;
  
    dayOne = getFutureTemperature(0);
    dayTwo = getFutureTemperature(8);
    dayThree = getFutureTemperature(16);

    document.querySelector('#dayOne').textContent = dayOne;
    document.querySelector('#dayTwo').textContent = dayTwo;
    document.querySelector('#dayThree').textContent = dayThree;
  
    const imgDayOne = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    const imgDayTwo = `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;
    const imDayThree = `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;
    
    document.querySelector('#firstDay_icon').src = imgDayOne;
    document.querySelector('#secondDay_icon').src = imgDayTwo;
    document.querySelector('#thirdDay_icon').src = imDayThree;
  
  }

  async function getCoordinatesAndMap() {
    coordinatesApiURL = `https://api.opencagedata.com/geocode/v1/json?q=${currentCity}&language=${languageURL[lang]}&key=e5f4eb27c5f34a4bbd5a360131e83358&pretty=1&no_annotations=1`;
    const response = await fetch(coordinatesApiURL);
    const data = await response.json();
  
    const {country} = data.results[0].components;
    const longitude = data.results[0].geometry.lng;
    const latitude = data.results[0].geometry.lat;
    const city = (data.results[0].components.city === undefined)
    ? data.results[0].components.state
    : data.results[0].components.city;

    document.querySelector('#latitude').textContent = `${coordinatesNames[0][lang]}  ${latitude}`;
    document.querySelector('#longitude').textContent = `${coordinatesNames[1][lang]}  ${longitude}`;
  
  
    mapboxgl.accessToken = "pk.eyJ1IjoiYm9icnlzaCIsImEiOiJja2FyMmZzZWgwYXg5MnJscmE5OGR4cjQ5In0.0_yw8YWFZ4ImTQ-rs_XPPA";
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [longitude, latitude],
      zoom: 10 
    });
  
    document.querySelector('#cityName').textContent = `${country}, ${city}`;
  }

  function daysNames(){

    const daysOfWeek = [
      ['Sunday', 'Воскресенье', 'Нядзеля'],
      ['Monday', 'Понедельник', 'Панядзелак'],
      ['Tuesday', 'Вторник', 'Аўторак'],
      ['Wednesday', 'Среда', 'Серада'],
      ['Thursday', 'Четверг', 'Чацьвер'],
      ['Friday', 'Пятница', 'Пятніца'],
      ['Saturday', 'Суббота', 'Субота']
    ];


    const dayOfWeek = new Date().getDay();
    const firstDay = document.querySelector('#firstDay');
    const secondDay = document.querySelector('#secondDay');
    const thirdDay = document.querySelector('#thirdDay');
  
    switch (dayOfWeek) {
      case 0:
        firstDay.textContent = daysOfWeek[1][lang];
        secondDay.textContent = daysOfWeek[2][lang];
        thirdDay.textContent = daysOfWeek[3][lang];
        break;
      case 1:
        firstDay.textContent = daysOfWeek[2][lang];
        secondDay.textContent = daysOfWeek[3][lang];
        thirdDay.textContent = daysOfWeek[4][lang];
        break;
      case 2:
        firstDay.textContent = daysOfWeek[3][lang];
        secondDay.textContent = daysOfWeek[4][lang];
        thirdDay.textContent = daysOfWeek[5][lang];
        break;
      case 3:
        firstDay.textContent = daysOfWeek[4][lang];
        secondDay.textContent = daysOfWeek[5][lang];
        thirdDay.textContent = daysOfWeek[6][lang];
        break;
      case 4:
        firstDay.textContent = daysOfWeek[5][lang];
        secondDay.textContent = daysOfWeek[6][lang];
        thirdDay.textContent = daysOfWeek[0][lang];
        break;
      case 5:
        firstDay.textContent = daysOfWeek[6][lang];
        secondDay.textContent = daysOfWeek[0][lang];
        thirdDay.textContent = daysOfWeek[1][lang];
        break;
      case 6:
        firstDay.textContent = daysOfWeek[0][lang];
        secondDay.textContent = daysOfWeek[1][lang];
        thirdDay.textContent = daysOfWeek[2][lang];
        break;
      default:
    }
  }



  function changeCity() {
    currentCity = document.querySelector('#search__input').value;
    getWeatherForecast();
    getCoordinatesAndMap();
  }

  document.querySelector('#searchButton').addEventListener('click', changeCity);
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
      changeCity();
    }
  });

  function changeLanguage() {
    if (lang === 2) {
      lang = 0;
    }
    else {
      lang += 1;
    }
  
    switch (lang) {
      case 0:
        currentLanguage.textContent = 'En';
        break;
      case 1:
        currentLanguage.textContent = 'Ru';
        break;
      case 2:
        currentLanguage.textContent = 'Be';
        break;
      default:
    }

    getWeatherForecast();
    getCoordinatesAndMap();
  }

  function change(temperature) {
    return Math.round((9 / 5) * temperature + 32);
  }
  
  const at = document.querySelector('#apparentTemperature');
  const ct = document.querySelector('#currentTemperature');
  const fdt = document.querySelector('#dayOne');
  const sdt = document.querySelector('#dayTwo');
  const tdt = document.querySelector('#dayThree');
  
  function changeTemperature() {
    if (temperatureText === 'C') {
      at.textContent = `Perceived temperature: ${  change(apparentTemperature)}`;
      ct.textContent = change(currentTemperature);
      fdt.textContent = change(dayOne);
      sdt.textContent = change(dayTwo);
      tdt.textContent = change(dayThree);
      buttonTemperature.textContent = 'F';
      temperatureText = 'F';
    }
    else {
      at.textContent = `Perceived temperature: ${  apparentTemperature}`;
      ct.textContent = currentTemperature;
      fdt.textContent = dayOne;
      sdt.textContent = dayTwo;
      tdt.textContent = dayThree;
      buttonTemperature.textContent = 'C';
      temperatureText = 'C';
    }
}

function voiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  const searchInput = document.querySelector('#search__input');
  const voiceButton = document.querySelector('#voice__button');

  


voiceButton.addEventListener('click', () => {
    recognition.start();
  });
  recognition.addEventListener('result', (event) => {
    searchInput.value = event.results[0][0].transcript;
  });
}

  currentLanguage.addEventListener('click', changeLanguage);
  document.querySelector('#backgroundImage').addEventListener('click', getWeatherForecast);
  document.querySelector('#temperature').addEventListener('click', changeTemperature);

  voiceSearch();

  getWeatherForecast();

  getCoordinatesAndMap();

  daysNames();