let helpBlock = document.querySelector('.help_block');
let textBlock = helpBlock.querySelector('.help_block_main_text');
let activeHelpWindows = [];

function showHelpWindow(text, storage, timeout) {
    let storageCount = localStorage.getItem('helpWindow_'+ storage);
    if (storageCount === null) localStorage.setItem('helpWindow_' + storage, 0);
    setTimeout(() => {
        if (!+storageCount) {
            activeHelpWindows.push('');
            localStorage.setItem('helpWindow_' + storage, ++storageCount);
            textBlock.textContent = text;
            helpBlock.style.bottom = 0;
            setTimeout(() => {
                if (activeHelpWindows.length == 1)
                helpBlock.style.bottom = '-50px';
                activeHelpWindows.splice(0,1);
            }, 5000);
        }
    }, timeout);
}

export default showHelpWindow;