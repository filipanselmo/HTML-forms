const revealsList = document.querySelectorAll(".reveal");


function isVisible(element) {
    const {top, bottom} = element.getBoundingClientRect();

    if(bottom < 0 || top > window.innerHeight) {
        return false;
    }

    return true;
}

window.addEventListener("scroll", (event) => {
    for(let el of revealsList) {
        if(isVisible(el)) {
            el.classList.add("reveal_active");
        } else {
            el.classList.remove("reveal_active");
        }
    }
});