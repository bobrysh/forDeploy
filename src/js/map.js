import {languageURL,coordinatesNames } from './Constants/constants';


export async function getCoordinatesAndMap() {
    const currentCity = document.querySelector('#search__input').value; 

    const coordinatesApiURL = `https://api.opencagedata.com/geocode/v1/json?q=${currentCity}&language=${languageURL[window.lang]}&key=e5f4eb27c5f34a4bbd5a360131e83358&pretty=1&no_annotations=1`;
    const response = await fetch(coordinatesApiURL);
    const data = await response.json();
  
    const {country} = data.results[0].components;
    const longitude = data.results[0].geometry.lng;
    const latitude = data.results[0].geometry.lat;
    const city = (data.results[0].components.city === undefined)
    ? data.results[0].components.state
    : data.results[0].components.city;
  
    document.querySelector('#latitude').textContent = `${coordinatesNames[0][window.lang]}  ${latitude}`;
    document.querySelector('#longitude').textContent = `${coordinatesNames[1][window.lang]}  ${longitude}`;

    mapboxgl.accessToken = "pk.eyJ1IjoiYm9icnlzaCIsImEiOiJja2FyMmZzZWgwYXg5MnJscmE5OGR4cjQ5In0.0_yw8YWFZ4ImTQ-rs_XPPA";
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [longitude, latitude],
      zoom: 10 
    });
  
    document.querySelector('#cityName').textContent = `${country}, ${city}`;
  }