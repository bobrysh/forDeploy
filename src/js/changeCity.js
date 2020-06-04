import { getWeatherForecast } from './forecast'
import { getCoordinatesAndMap } from './map'
import { getImg } from './getImg';

export function changeCity(currentCity) {
    getWeatherForecast(currentCity);
    getCoordinatesAndMap(currentCity);
    getImg();
  }