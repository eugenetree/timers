import audiosObj from './audios';
import storageArray from '../storageSave/storageCode';

function updateStorageArray() {
  localStorage.setItem('timers', JSON.stringify(storageArray));
}

class Sound {
    constructor() {
      this.soundSelected = false;
      this.soundBoard = this.generateSoundBoard();
    }
  
    generateSoundBoard() {
      let soundBoard = document.createElement('div');
      let select = document.createElement('div');
      let options = document.createElement('div');
      soundBoard.classList.add('sound_wrapper');
      select.classList.add('sound_select');
      options.classList.add('sound_options')
      options.classList.add('offScrollY');
      options.style.height = audiosObj.audiosCount*31+'px';
      soundBoard.append(select);
      soundBoard.append(options);
      createOptionsList.call(this);
      setListenerss.call(this);
  
      return soundBoard;
      
      // create list of songs from 'audios' 
      function createOptionsList() {
        if (!this.soundSelected) select.textContent = audiosObj.audios['defaultStatus']['name'];
        else select.textContent = this.soundSelected;
        
        for (let key in audiosObj.audios){
          let option = document.createElement('div');
          option.classList.add('sound_option');
          option.textContent = audiosObj.audios[key].name;
          options.append(option);
        }
      }
  
      function setListenerss() {
        select.addEventListener('click', () => {
          this.soundBoard.closest('.timer').classList.toggle('z_index');
          console.log(options);
          options.classList.toggle('show_audios');
        });
        options.addEventListener('click', e => {
          select.textContent = e.target.textContent;
          this.soundSelected = select.textContent;
          updateStorageArray();
        });
        document.addEventListener('click', e => {
          if (e.target != select) this.soundBoard.closest('.timer').classList.remove('z_index');
          if (e.target != select) options.classList.remove('show_audios');
        })
      }
    }
  }

  export default Sound;