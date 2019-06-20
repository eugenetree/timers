function classListRemove() {
    [].forEach.call(arguments, (elem, i) => {
        if (!i) return;
        elem.classList.remove(arguments[0]);
    })
}

export default classListRemove;