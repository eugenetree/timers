function checkZero(num) {
    if ( (num + '').length == 1) return '0'+num;
    else return num;
  }
  
  export default checkZero;