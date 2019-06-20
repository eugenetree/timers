import storageArray from './storageSave/storageCode';
import DateTimer from './timer';
import createElem from './helpFuncs/createElem';
import appendElems from './helpFuncs/appendElems';


class MinuteTimer extends DateTimer{
    constructor(date) {
        super(date);
        this.end = date;
        this.timeToEnd;
        this.timerPaused = false;
        this.timerClass = 'minutes';
    }

        startCount(rebooted) {
          if (this.timeToEnd && this.timerPaused) {
            this.end = Date.now() + this.timeToEnd;
          };
        
          this.timerPaused = false;   
            if (!this.interval && this.end - Date.now() > 0) {
              this.updateTime();
              this.interval = setInterval(this.updateTime.bind(this),88);
            }
        
            if (rebooted) {
              this.interval = setInterval(this.updateTime.bind(this),88);
            }
            setTimeout(() => {
              updateStorageArray();
            }, 0);
          }

        pauseCount() {
          this.timerPaused = true;
            this.timeToEnd = this.end - Date.now();
            clearInterval(this.interval);
            this.interval = 0;
            setTimeout(() => {
              updateStorageArray();
            }, 0);;
          }
    }

    function updateStorageArray() {
      localStorage.setItem('timers', JSON.stringify(storageArray));
    }


    
export default MinuteTimer;