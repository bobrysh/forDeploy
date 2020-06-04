import { getWeatherForecast } from './forecast'
import { daysNames } from './futureDays'
import { voiceSearch } from './voiceSearch'
import { handleClick } from './clicks';
import { getCoordinatesAndMap } from './map';
import { Timer } from './timer';
import { getImg } from './getImg';

export function getUserGeolocation() {
    const url = 'https://ipinfo.io/json?token=49c813171d915e';
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector('#search__input').value = data.city
        getWeatherForecast(); 
        getCoordinatesAndMap();
        getImg();
        voiceSearch();
        daysNames();
        handleClick();
        Timer();
      })
      .catch(() => console.log('Try again!'));
  }