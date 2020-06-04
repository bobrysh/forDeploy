export const currentLanguage = document.querySelector('#language');
export const buttonTemperature = document.querySelector('#temperature');
export const languageURL = ['en', 'ru', 'be'];
export const languageDate = ['en-US', 'ru-RU', 'ru-RU'];
export const weatherParameters = [
['Perceived temperature(°): ', 'Ощущается как(°): ', 'Якая адчуваецца тэмпература(°): '],
['Weather description: ', 'Погода: ', 'Апісанне надвор`я: '],
['Wind speed(m/s): ', 'Скорость ветра(м/с): ', 'Хуткасць ветру(м/с): '],
['Humidity(%): ', 'Влажность воздуха(%): ', 'Вільготнасць(%): ']
];
export const coordinatesNames = [
['Latitude: ', 'Широта: ', 'Шырата: '],
['Longitude: ', 'Долгота: ', 'Даўгата: ']
];
export const at = document.querySelector('#apparentTemperature');
export const ct = document.querySelector('#currentTemperature');
export const fdt = document.querySelector('#dayOne');
export const sdt = document.querySelector('#dayTwo');
export const tdt = document.querySelector('#dayThree');
export const currentCity = document.querySelector('#search__input').value || 'Vorkuta'; 

