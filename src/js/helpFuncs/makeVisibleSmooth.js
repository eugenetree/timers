function makeVisible() {
        [].forEach.call(arguments, elem => {
            elem.style.visibility = 'visible';
            setTimeout(() => {
                elem.style.opacity = 1;
            }, 0);
        });
}

export default makeVisible;

