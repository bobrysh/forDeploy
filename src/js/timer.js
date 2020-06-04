import {languageURL,currentCity} from './Constants/constants';

export async function Timer() {
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&window.lang=${languageURL[window.lang]}&units=metric&APPID=9e6da5e116f6b026eff42627fb289a55`;
    const response = await fetch(weatherApiURL);
    const data = await response.json();
    const time = new Date();
    const timezone = (data.city.timezone / 3600) - 3;
    const hour = time.getHours() + timezone;
    let minute = time.getMinutes();
    let second = time.getSeconds();
    const currentTime = document.querySelector('#currentTime');
    function seconds(){
        currentTime.textContent = `${hour  }:${  minute}:${  second += 1}`;
        if(second >= 59){
            second = 0
            minute += 1
        }
    }
      setInterval(() => seconds(), 1000);
  }
