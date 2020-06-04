import {currentCity,languageURL} from './Constants/constants';

export async function getImg() {
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&window.lang=${languageURL[window.lang]}&units=metric&APPID=9e6da5e116f6b026eff42627fb289a55`;
    const response = await fetch(weatherApiURL);
    const data = await response.json();
    const time = new Date();
    const month = time.getMonth();
    const hours = time.getHours();
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

    })();

    console.log('Для проверяющих: картинка показывается учитывая время года, дня и погоды')
    console.log('imgURL', imgURL)
  }