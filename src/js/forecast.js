import {languageURL,weatherParameters,buttonTemperature,appTemperature,currTemperature,firstDay,secondDay,thirdDay} from './Constants/constants';

export async function getWeatherForecast() {
    const currentCity = document.querySelector('#search__input').value; 
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&window.lang=${languageURL[window.lang]}&units=metric&APPID=9e6da5e116f6b026eff42627fb289a55`;
    const response = await fetch(weatherApiURL);
    const data = await response.json();

    function change(temperature) {
      return Math.round((9 / 5) * temperature + 32);
    }

    function getFutureTemperature(startPos) {
      const start = startPos;
      const end = start + 8;
      let acc = 0;
      for (let i = start; i < end; i+=1) {
        acc += data.list[i].main.temp;
      }
      return Math.round(acc / 8);
    }
    
    let dayOne = document.querySelector('#dayOne').textContent
    let dayTwo = document.querySelector('#dayTwo').textContent
    let dayThree = document.querySelector('#dayThree').textContent
  
    dayOne = getFutureTemperature(0);
    dayTwo = getFutureTemperature(8);
    dayThree = getFutureTemperature(16);

    firstDay.textContent = dayOne;
    secondDay.textContent = dayTwo;
    thirdDay.textContent = dayThree;

    const currentTemperature = Math.round(data.list[0].main.temp);
    document.querySelector('#currentTemperature').textContent = currentTemperature;
  
    const apparentTemperature = Math.round(data.list[0].main.temp_kf);
    document.querySelector('#apparentTemperature').textContent = weatherParameters[0][window.lang] + apparentTemperature;
  
    const windSpeed = Math.round(data.list[0].wind.speed);
    document.querySelector('#wind_speed').textContent = weatherParameters[2][window.lang] + windSpeed;
  
    const weatherDescription = data.list[0].weather[0].description;
    document.querySelector('#weather_description').textContent = weatherParameters[1][window.lang] + weatherDescription;
  
    const {humidity} = data.list[0].main;
    document.querySelector('#humidity').textContent = weatherParameters[3][window.lang] + humidity;
  
    const imgURL = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    document.querySelector('#weather_icon').src = imgURL;
  
    const imgDayOne = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    const imgDayTwo = `http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`;
    const imDayThree = `http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`;
    
    document.querySelector('#firstDay_icon').src = imgDayOne;
    document.querySelector('#secondDay_icon').src = imgDayTwo;
    document.querySelector('#thirdDay_icon').src = imDayThree;
   
    function changeTemperature() {
      const temperatureText = buttonTemperature.textContent
      if (temperatureText === 'C') {
      appTemperature.textContent = `Perceived temperature: ${  change(apparentTemperature)}`;
      currTemperature.textContent = change(currentTemperature);
      firstDay.textContent = change(dayOne);
      secondDay.textContent = change(dayTwo);
      thirdDay.textContent = change(dayThree);
      buttonTemperature.textContent = 'F';
      }
      else {
      appTemperature.textContent = `Perceived temperature: ${  apparentTemperature}`;
      currTemperature.textContent = currentTemperature;
      firstDay.textContent = dayOne;
      secondDay.textContent = dayTwo;
      thirdDay.textContent = dayThree;
      buttonTemperature.textContent = 'C';
    }
  }
  document.querySelector('#temperature').addEventListener('click', changeTemperature);
  }