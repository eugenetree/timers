
function hidePopUp() {
    [].forEach.call(arguments, ( elem => elem.classList.remove('show_popup')));
    let block = document.querySelector('.block_screen');
    if (block) block.remove();
  }

  export default hidePopUp;