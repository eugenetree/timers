import hidePopUp from './hidePopUp';
import showHelpWindow from './showHelpWindow';

// create modals
function createPopUpWindow(popup) {
    showHelpWindow('Для создания таймера можете нажать Enter', 'enter', 0); 
    let popupDate = document.getElementById('create_popup_date');
    let popupMinutes = document.getElementById('create_popup_minutes');
    hidePopUp(popupDate, popupMinutes);
    popup.classList.add('show_popup');
    let blockScreen = document.createElement('div');
    blockScreen.classList.add('block_screen');
    blockScreen.addEventListener('click', () => hidePopUp(popup));
    document.body.append(blockScreen);
}

export default createPopUpWindow;