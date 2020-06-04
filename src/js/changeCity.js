import { getWeatherForecast } from './forecast'
import { getCoordinatesAndMap } from './map'
import { getImg } from './getImg';
import {getTime} from './timer';

export function changeCity(currentCity) {
    getWeatherForecast(currentCity);
    getCoordinatesAndMap(currentCity);
    getImg();
    getTime();
  }