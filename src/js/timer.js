import moment from 'moment';
import 'moment-timezone';
import { languageURL } from './Constants/constants';

export const getTime = async () => {

    const clockContainer = document.querySelector('#currentTime');
    const currentCity = document.querySelector('#search__input').value;
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&window.lang=${languageURL[window.lang]}&units=metric&APPID=9e6da5e116f6b026eff42627fb289a55`;
    const response = await fetch(weatherApiURL);
    const data = await response.json();

    if (data.cod === "400"){
      alert("Город не найден")
      return
    }

    window.interval = setInterval(() => {
        const clockWithTimezone = moment().utcOffset(data.city.timezone / 60).format('h:mm:ss');
        clockContainer.textContent = `${clockWithTimezone}`;
    }, 1000);
};