function classListAdd() {
    [].forEach.call(arguments, (elem, i) => {
        if (!i) return;
        elem.classList.add(arguments[0]);
    })
}

export default classListAdd;