function validateMinutesInput(event) {
    let input = event.target;
    let inputText = event.key;
    if ((isNaN(inputText) || event.keyCode == '32')
      && event.key != 'Backspace'
      && event.key != 'ArrowLeft'
      && event.key != 'ArrowRight')
      event.preventDefault();

    if (input.value.length == '2') {
      if ( event.key != 'Backspace'
        && event.key != 'ArrowLeft'
        && event.key != 'ArrowRight') {
        input.value = `${input.value[1]}`;
      }
    };
  }

  export default validateMinutesInput;