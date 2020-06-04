export function daysNames(){
    const daysOfWeek = [
      ['Sunday', 'Воскресенье', 'Нядзеля'],
      ['Monday', 'Понедельник', 'Панядзелак'],
      ['Tuesday', 'Вторник', 'Аўторак'],
      ['Wednesday', 'Среда', 'Серада'],
      ['Thursday', 'Четверг', 'Чацьвер'],
      ['Friday', 'Пятница', 'Пятніца'],
      ['Saturday', 'Суббота', 'Субота']
    ];

    const dayOfWeek = new Date().getDay();
    const firstDay = document.querySelector('#firstDay');
    const secondDay = document.querySelector('#secondDay');
    const thirdDay = document.querySelector('#thirdDay');
  
    switch (dayOfWeek) {
      case 0:
        firstDay.textContent = daysOfWeek[1][window.lang];
        secondDay.textContent = daysOfWeek[2][window.lang];
        thirdDay.textContent = daysOfWeek[3][window.lang];
        break;
      case 1:
        firstDay.textContent = daysOfWeek[2][window.lang];
        secondDay.textContent = daysOfWeek[3][window.lang];
        thirdDay.textContent = daysOfWeek[4][window.lang];
        break;
      case 2:
        firstDay.textContent = daysOfWeek[3][window.lang];
        secondDay.textContent = daysOfWeek[4][window.lang];
        thirdDay.textContent = daysOfWeek[5][window.lang];
        break;
      case 3:
        firstDay.textContent = daysOfWeek[4][window.lang];
        secondDay.textContent = daysOfWeek[5][window.lang];
        thirdDay.textContent = daysOfWeek[6][window.lang];
        break;
      case 4:
        firstDay.textContent = daysOfWeek[5][window.lang];
        secondDay.textContent = daysOfWeek[6][window.lang];
        thirdDay.textContent = daysOfWeek[0][window.lang];
        break;
      case 5:
        firstDay.textContent = daysOfWeek[6][window.lang];
        secondDay.textContent = daysOfWeek[0][window.lang];
        thirdDay.textContent = daysOfWeek[1][window.lang];
        break;
      case 6:
        firstDay.textContent = daysOfWeek[0][window.lang];
        secondDay.textContent = daysOfWeek[1][window.lang];
        thirdDay.textContent = daysOfWeek[2][window.lang];
        break;
      default:
    }
  }