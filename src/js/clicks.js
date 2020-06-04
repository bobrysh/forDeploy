import { changeCity } from './changeCity';

export function handleClick(){
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
          changeCity();
        }
      });
}

