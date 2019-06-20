import storageArray from '../storageSave/storageCode'; // get access to storage
import DateTimer from '../timer'; // DateTimer
import setScrollTo from '../helpFuncs/setScrollTo'; // set scroll level for date lists
import MinuteTimer from '../timerMinutes'; // MinuteTimer
import checkZero from '../helpFuncs/checkZero'; // return 01 instead 1
import hidePopUp from '../helpFuncs/hidePopUp'; // hide modals
import createPopUpWindow from '../helpFuncs/createPopUpWindow'; // create modals
import validateMinutesInput from '../helpFuncs/validateMinutesInput'; // validate input for minute timer
import validateDateInput from '../helpFuncs/validateDateInput'; //validate input for date timer
import showHelpWindow from '../helpFuncs/showHelpWindow'; // show help alert in bottom of screen

let showPopUpDate = document.getElementById('timer_date');
let showPopUpMins = document.getElementById('timer_minutes');
let popupDate = document.getElementById('create_popup_date');
let popupMinutes = document.getElementById('create_popup_minutes');

showPopUpDate.onclick = () => createPopUpWindow(popupDate);
showPopUpMins.onclick = () => createPopUpWindow(popupMinutes);

let createButtonDateTimer = document.querySelector('#create_button_date_timer');
let createButtonMinuteTimer = document.querySelector('#create_button_minute_timer');

createButtonDateTimer.onclick = () => {
  let date = validateDateInput(monthsSelect, daysSelect, hoursSelect, minsSelect);
  if (date) {
    startCreateDate(date);
    hidePopUp(popupDate);
  }
}

createList(document.getElementById('days_options'), 1, 31);
createList(document.getElementById('hours_options'), 0, 23);
createList(document.getElementById('mins_options'), 0, 59);

let monthsSelect = document.getElementById('months_select')
let daysSelect = document.getElementById('days_select');
let hoursSelect = document.getElementById('hours_select');
let minsSelect = document.getElementById('mins_select');

let selects = document.querySelectorAll('.select');
let options = document.querySelectorAll('.options');

let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

setSelectNamesForDateInputs();
setListenersForDateInputs();

// set default date on timer's selects
function setSelectNamesForDateInputs() { 
  let date = new Date();
  monthsSelect.textContent = months[date.getMonth()];
  daysSelect.textContent = checkZero(date.getDate());
  hoursSelect.textContent = checkZero(date.getHours()+1);
  minsSelect.textContent = '00';
}

// set toggle logic of selects
function setListenersForDateInputs() {
      selects.forEach( (elem, i) => {
    elem.addEventListener('click', () => {
        options[i].classList.toggle('show');
        setScrollTo(options[i], options[i].previousElementSibling.textContent);
    });
  
    options[i].addEventListener('click', function(e) {
         let target = e.target;
         elem.textContent = target.textContent;
         elem.classList.remove('show');
       });
  
    document.addEventListener('click', e => {
      if ( e.target != elem ) options[i].classList.remove('show');
    })
  });
}

// create lists of months/days/minutes/seconds
function createList(elem, from, to) {
  for (let i = from; i <= to; i++) {
    let appendElem = document.createElement('div');
    appendElem.classList.add('option');
    appendElem.textContent = checkZero(i);
    elem.append(appendElem);
  }
}

// create date timer
function startCreateDate(date) {
  let timer = new DateTimer(new Date(2019, date.months, date.days, date.hours, date.mins));
  timer.generate();
  timer.startCount();
  timer.createSound(timer.sound);
  storageArray.push(timer);
  localStorage.setItem('timers', JSON.stringify(storageArray));
  showHelpWindow('У вас так же есть возможность создавать несколько таймеров одновременно', 'many_timers', 0);
}

// create minute timer
createButtonMinuteTimer.addEventListener('click', () => {
  let secInput = document.querySelector('input[name="sec"]');
  if (+secInput.value >= 60) {
    alert('Wrong seconds number');
  }
  else {
    let timer = new MinuteTimer(Date.now()+(+minutesInputs[0].value*60*1000)+(+minutesInputs[1].value*1000));
    timer.generate();
    timer.startCount();
    timer.createSound(timer.sound);
    storageArray.push(timer);
    localStorage.setItem('timers', JSON.stringify(storageArray));
    hidePopUp(popupMinutes);
    showHelpWindow('У вас так же есть возможность создавать несколько таймеров одновременно', 'many_timers', 0);
  }
});

// validate minute timer inputs
let minutesInputs = document.querySelectorAll('.input_popup');
minutesInputs.forEach( input => {
  input.addEventListener('keydown', validateMinutesInput);
});

// hotkeys for popups
document.onkeydown = e => {
  if (e.key == '1' && e.altKey && !popupDate.classList.contains('show_popup')) {
    createPopUpWindow(popupDate);
  }
  if (e.key == '2' && e.altKey && !popupMinutes.classList.contains('show_popup')) {
    createPopUpWindow(popupMinutes);
  }
  if (e.key == 'Escape') hidePopUp(popupDate, popupMinutes);
  if (e.key == 'Enter') {
    let timer = document.querySelector('.show_popup');
    console.log(timer);
    if (timer.id == 'create_popup_date') createButtonDateTimer.click();
    if (timer.id == 'create_popup_minutes') createButtonMinuteTimer.click();
  }
}

showHelpWindow('Иногда для вас будут появляться некоторые подсказки, объясняющие функционал сайта', 'start', 2000);

