function appendElems(target) {
    [].forEach.call(arguments, (elem, i) => {
        if (i == 0) return;
        target.append(elem);
    });
}

export default appendElems;