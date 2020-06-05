import { getWeatherForecast } from './forecast'
import { getCoordinatesAndMap } from './map'
import { getImg } from './getImg';
import { getTime } from './timer';

export function changeCity(currentCity) {
  if (window.interval) {
    clearInterval(window.interval)
  }
  getWeatherForecast(currentCity);
  getCoordinatesAndMap(currentCity);
  getImg();
  getTime();
}