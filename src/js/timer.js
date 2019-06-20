import Sound from './soundBoard/sound';
import audiosObj from './/soundBoard/audios';
import storageArray from './storageSave/storageCode';
import createElem from './helpFuncs/createElem';
import appendElems from './helpFuncs/appendElems';
import makeVisible from './helpFuncs/makeVisibleSmooth';
import classListAdd from './helpFuncs/classListAdd';
import classListRemove from './helpFuncs/classListRemove';
import showHelpWindow from './helpFuncs/showHelpWindow';


class DateTimer {
    constructor(date){
      if (date instanceof Date) this.end = date.getTime();
      this.interval = 0;
      this.timerDiv;
      this.sound;
      this.timerClass = 'date';
    }
  
    generate() {
      this.timerDiv = createElem('div', '', 'timer');
      this.buttonStop = createElem('button', 'STOP', 'stop_button', {click: ()=>this.pauseCount()});
      this.buttonStart = createElem('button', 'START', 'start_button', {click: ()=>this.startCount()});
      this.buttonDelete = createElem('button', 'DELETE', 'delete_button', {click: ()=>this.deleteTimer()});
      this.months = createElem('div', '', 'counter_point');
      this.days = createElem('div', '', 'counter_point');
      this.hours = createElem('div', '', 'counter_point');
      this.minutes = createElem('div', '', 'counter_point');
      this.seconds = createElem('div', '', 'counter_point');
      this.mili = createElem('div', '', 'counter_point');

      let changeOrderUp = createElem('div', '', 'change_order_up', {click: ()=> this.changeOrderUp()});
      let changeOrderDown = createElem('div', '', 'change_order_down', {click: ()=> this.changeOrderDown()});

      this.destroyTimer = createElem('div', '', 'destroy_timer');
      this.destroyTimerInteract = createElem('div', '', 'destroy_timer_interact', {click: () => this.deleteTimer()});
      let destroyMark = createElem('div', '', 'destroy_timer_mark');
      this.destroyTimerInteract.append(destroyMark);
      let destroyText = createElem('button', 'DESTROY TIMER', 'destroy_button');
      this.destroyTimerInteract.append(destroyText);
      
      
      this.timerCounters = document.createElement('div');
      this.buttonsWrapper = document.createElement('div');
      this.monthsWrapper = document.createElement('div');
  
      this.counterPoints = [this.months, this.days, this.hours, this.minutes, this.seconds, this.mili];
      this.counterPointsNames = ['months', 'days', 'hours', 'minutes', 'seconds', 'miliseconds'];
      this.timerCounters.classList.add('timer_counters');
      this.buttonsWrapper.classList.add('buttons_wrapper');
  
  
      this.timerDiv.classList.add('zero_opacity');
      appendElems(this.timerDiv, this.timerCounters, this.buttonsWrapper, this.destroyTimer, this.destroyTimerInteract, changeOrderUp, changeOrderDown);
      appendElems(this.timerCounters, this.months, this.days, this.hours, this.minutes, this.seconds, this.mili);
      if (this.timerClass == 'minutes') appendElems(this.buttonsWrapper, this.buttonStart, this.buttonStop);
      appendElems(this.buttonsWrapper, this.buttonDelete);


  
      createWrappersForCounterPoints.call(this);
  
      document.body.insertBefore(this.timerDiv, document.body.children[2]);
    
      setTimeout(() => {
        this.timerDiv.classList.remove('zero_opacity');
        this.timerDiv.classList.add('full_opacity');
      });
  
      function createWrappersForCounterPoints() {
        this.counterPoints.forEach( (elem, i) => {
          let wrapper = document.createElement('div');
          let bottomText = document.createElement('span');
          bottomText.textContent = this.counterPointsNames[i];
          bottomText.classList.add('counter_point_bottom_text')
          wrapper.append(elem);
          wrapper.append(bottomText);
          wrapper.classList.add('counter_point_wrapper');
          this.timerCounters.append(wrapper);
        })
      }
      setTimeout(() => {
        if (storageArray.length > 1) 
        showHelpWindow('Таймеры можно перемещать при помощи стрелок в правом нижнем углу каждого таймера', 'change_timers_pos', 0);
      }, 0); 

    }
  
    createSound(song) {
      if (song) {
        this.sound.__proto__ = Sound.prototype;
        this.sound.soundBoard = this.sound.generateSoundBoard();
      }
      else this.sound = new Sound();
      this.buttonsWrapper.append(this.sound.soundBoard);
    }
    
    startCount(rebooted) {
      if (!this.interval && this.end - Date.now() > 0) {
        this.updateTime();
        this.interval = setInterval(this.updateTime.bind(this),88);
      }
  
      if (rebooted) {
        this.interval = setInterval(this.updateTime.bind(this),88);
      }
      
    }
  
  
    pauseCount() {
      clearInterval(this.interval);
      this.interval = 0;
    }
  
    deleteTimer() {
      this.pauseCount();
      this.timerDiv.parentNode.removeChild(this.timerDiv);
      if (this.alertAudio) this.alertAudio.pause();
      storageArray.forEach ( (elem, i) => {
        if (this == elem) deleteFromArray(i);
      })
  
      function deleteFromArray(i) {
        storageArray.splice(i,1);
        localStorage.setItem('timers', JSON.stringify(storageArray));      
      }
    } 
  
    endAlert() {
      let alertAudio = new Audio();
          let soundSelected = this.sound.soundSelected;
      for (let key in audiosObj.audios) {
        if (audiosObj.audios[key]['name'] == soundSelected) {
          console.log(this);
          console.log(alertAudio);
          alertAudio.src = audiosObj.audios[key]['src'];
          alertAudio.play();
          this.alertAudio = alertAudio;
        }
      }
      makeVisible(this.destroyTimer, this.destroyTimerInteract);
    }
  
    updateTime() {
      let temp = this.end - Date.now()
  
      if (temp < 0) {
        this.pauseCount();
        drawTime.call(this, '00','00','00','00','00','00');
        this.endAlert();
        return;
      }
  
      let months = Math.floor(temp / 2592000000);
      let days = Math.floor((temp - (2592000000 * months)) / 86400000);
      let hours = Math.floor((temp - (2592000000 * months) - 86400000 * days) / (1000*3600));
      let minutes = Math.floor((temp - (2592000000 * months) - (86400000 * days) - (1000 * 3600 * hours)) / (1000 * 60));
      let seconds = Math.floor(((temp - (2592000000 * months) - (86400000 * days) - (1000 * 3600 * hours) - (1000 * 60 * minutes)) / 1000));
      let mili = Math.floor((temp - (2592000000 * months) - (86400000 * days) - (1000 * 3600 * hours) - (1000 * 60 * minutes) - (1000 * seconds)) / 10);
  
      let fixZero = validateOutput(months, days, hours, minutes, seconds, mili);
      drawTime.apply(this, [...fixZero]);
  
      function validateOutput() {
        let result = [];
        for (let i = 0; i < arguments.length; i++) {
          if ((''+arguments[i]).length == 1) result.push('0'+arguments[i]);
          else result.push(arguments[i]);
        }
        return result;
      }
  
      function drawTime() {
        let months = arguments[0];
        let days = arguments[1];
        let hours = arguments[2];
        let minutes = arguments[3];
        let seconds = arguments[4];
        let mili = arguments[5];
        this.months.textContent = months;
        this.days.textContent = days;
        this.hours.textContent = hours;
        this.minutes.textContent = minutes;
        this.seconds.textContent = seconds;
        this.mili.textContent = mili+'';
      }
    }

    changeOrderUp() {
      if (this.timerDiv.previousSibling.classList.contains('timer')) {
        classListAdd('zero_opacity', this.timerDiv, this.timerDiv.previousSibling);
        setTimeout(() => {
          document.body.insertBefore(this.timerDiv, this.timerDiv.previousSibling);
          setTimeout(() => {
            classListRemove('zero_opacity', this.timerDiv, this.timerDiv.nextSibling);
          }, 0);
        }, 1000);
      }
    }

    changeOrderDown() {
      if (this.timerDiv.nextSibling.classList.contains('timer')) {
        classListAdd('zero_opacity', this.timerDiv, this.timerDiv.nextSibling);
        setTimeout(() => {
          document.body.insertBefore(this.timerDiv, this.timerDiv.nextSibling.nextSibling);
          setTimeout(() => {
            classListRemove('zero_opacity', this.timerDiv, this.timerDiv.previousSibling);
          }, 0);
        }, 1000);
      }
    }


  }

  export default DateTimer;