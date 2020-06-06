import { getWeatherForecast } from './forecast'
import { daysNames } from './futureDays'
import { voiceSearch } from './voiceSearch'
import { handleClick } from './clicks';
import { getCoordinatesAndMap } from './map';
import { getTime } from './timer';
import { getImg } from './getImg';

export function getUserGeolocation() {
    const url = 'https://ipinfo.io/json?token=49c813171d915e';
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector('#search__input').value = data.city
        getWeatherForecast(); 
        getCoordinatesAndMap();
        voiceSearch();
        daysNames();
        handleClick();
        getTime();
        getImg();
      })
      .catch(() => console.log('Try again!'));
  }