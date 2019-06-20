import DateTimer from '../timer'
import MinuteTimer from '../timerMinutes'
import Sound from '../soundBoard/sound';

function checkStorage() {
    let timers = localStorage.getItem('timers');
    if (!timers) return '';
    return JSON.parse(timers);
  }
  
  let storageArray = checkStorage() || [];
  storageArray.forEach( timer => {
    if (timer.timerClass == 'date') timer.__proto__ = DateTimer.prototype;
    if (timer.timerClass == 'minutes') timer.__proto__ = MinuteTimer.prototype;
    timer.generate();
    if (!timer.timerPaused) timer.startCount(true);
    else {
      timer.startCount();
      timer.updateTime();
      timer.pauseCount();
    };
    timer.sound.__proto__ = Sound.prototype;
    timer.createSound(timer.sound);
  });

  export default storageArray;
  