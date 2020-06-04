import {changeCity} from './changeCity'

export function voiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    const searchInput = document.querySelector('#search__input');
    const voiceButton = document.querySelector('#voice__button');

  voiceButton.addEventListener('click', () => {
      recognition.start();
    });
    recognition.addEventListener('result', (event) => {
      searchInput.value = event.results[0][0].transcript;
      changeCity();
    });
  }