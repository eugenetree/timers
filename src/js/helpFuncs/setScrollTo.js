function setScrollTo(wrapper, scrollContent) {
let wrapperTop, scrollElem, scrollElemTop;
    wrapper.scrollTo(0,0);
    if (wrapper.classList.contains('show')) {
        wrapperTop = wrapper.getBoundingClientRect().top;
        
        for (let elem of wrapper.children) {
            if (elem.textContent == scrollContent) scrollElem = elem;  
        }
        wrapperTop = wrapper.getBoundingClientRect().top;
        let scrollElemTop = scrollElem.getBoundingClientRect().top;
        wrapper.scrollTo(0, scrollElemTop-wrapperTop);
    }
    return [wrapperTop, scrollElemTop];
}

    export default setScrollTo;