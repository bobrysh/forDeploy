import { currentCity,currentLanguage } from './Constants/constants';
import { getWeatherForecast } from './forecast';
import { getCoordinatesAndMap } from './map';
import { daysNames } from './futureDays';

export function changeLanguage() {
    switch (window.lang) {
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
    getWeatherForecast(currentCity);
    getCoordinatesAndMap(currentCity);
    daysNames();
  }