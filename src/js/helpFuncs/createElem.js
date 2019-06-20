function createElem(tag, textContent, classList, listeners) {
    let element = document.createElement(tag);
    if (textContent) element.textContent = textContent;
    if (classList) element.classList.add(classList);
    if (listeners) for (let key in listeners) {
        element.addEventListener(key, listeners[key]);
    }
    return element;
}

export default createElem;