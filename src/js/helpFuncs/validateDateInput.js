let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];  
  
function validateDateInput(monthsSelect, daysSelect, hoursSelect, minsSelect) {
    let days = daysSelect.textContent;
    let monthsIndex = months.indexOf(monthsSelect.textContent);
    let hours = hoursSelect.textContent;
    let mins = minsSelect.textContent;

    let timerDate = {
        months: monthsIndex,
        days: days,
        hours: hours,
        mins: mins
    }

    if (new Date(2019, +monthsIndex, +days, +hours, +mins).getTime() < Date.now()) {
        alert ('Введите корректные значения даты');
        return;
    }
    return timerDate;   
}

  export default validateDateInput;