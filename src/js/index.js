import '../css/style.css';
import {currentLanguage} from './Constants/constants';
import { loadJs, loadCss } from './utils';
import { changeLanguage } from './changeLanguage';
import { changeCity } from './changeCity';
import { getImg } from './getImg';
import { getUserGeolocation } from './getLocation';

loadJs('https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js');
loadJs('https://kit.fontawesome.com/6c53f4905f.js');
loadCss('https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css');
currentLanguage.textContent = 'En';
window.onload = function(){
  window.lang = 0;
  currentLanguage.addEventListener('click',()=>{
    window.lang += 1;
    if (window.lang > 2) {
      window.lang = 0;
    }
  return changeLanguage()});
  document.querySelector('#backgroundImage').addEventListener('click', getImg);
  document.querySelector('#searchButton').addEventListener('click', ()=>{
    return changeCity()});
    getUserGeolocation();
}

