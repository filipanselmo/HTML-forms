
const bookContent = document.querySelector(".book__content");
const activeButtons = {};

function addControlEvent(key, controlClass, buttonClass, contentProperty, buttonData,  activeButtons) {
    const control = document.querySelector(`.book__control_${controlClass}`);
    const buttons = control.querySelectorAll(`.${buttonClass}`); 
    activeButtons[key] = getActiveButton(buttons, buttonClass);

    control.addEventListener("click", (event) => {
        event.preventDefault();
    
        if(!event.target.classList.contains(buttonClass) || event.target.classList.contains(`${buttonClass}_active`)) {
            return;
        }

        activeButtons[key].classList.remove(`${buttonClass}_active`);
    
        activeButtons[key] = event.target;
        activeButtons[key].classList.add(`${buttonClass}_active`);
        
        const dataAttr = convertToCamelCase(buttonData);

        setContentProperty(bookContent, contentProperty, activeButtons[key].dataset[dataAttr]);
    })
}


function convertToCamelCase(string) {
    const words = string.split('-');
    return words[0] + words.slice(1).map(el => el.charAt(0).toUpperCase() + el.slice(1));
}


function getActiveButton(nodes, prefix) {
    return Array.apply(null, nodes).find(el => el.classList.contains(`${prefix}_active`));
}


function setContentProperty(bookContent, property, value) {
    for(let className of bookContent.classList) {
        if(className.indexOf(property) !== -1) {
            bookContent.classList.remove(className);
        }
    }

    if(value !== undefined) {
        bookContent.classList.add(`${property}-${value}`);
    }
};

addControlEvent("fs", "font-size", "font-size", "book_fs", "size", activeButtons);
addControlEvent("tc", "color", "color", "book_color", "text-color", activeButtons);
addControlEvent("bc", "background", "color", "book_bg", "bg-color", activeButtons);