
function getSliders() {
    return document.getElementsByClassName('slider__item');
}

function getDots() {
    return document.getElementsByClassName('slider__dot');
}

function getActiveIndex(sliders) {
    for(let i = 0; i < sliders.length; ++i) {
        if(sliders[i].classList.contains('slider__item_active')) {
            return i;
        }
    }
    return -1;
}

function getCorrectIndex(currentIndex, sliders) {
    let correctIndex = currentIndex % sliders.length;

    if (correctIndex < 0) {
        return sliders.length + correctIndex;
    }

    return correctIndex;
}


function getArrows() {
    return document.querySelectorAll(".slider__arrow");
}

function toggleSlider(slider) {
    slider.classList.toggle('slider__item_active');
}

function toggleDot(dot) {
    dot.classList.toggle('slider__dot_active');
}

function toggleByIndex(index, sliders, dots) {
    toggleSlider(sliders[index]);
    toggleDot(dots[index]);
}

function getDotIndex(currentDot, dots) {
    for(let i = 0; i < dots.length; ++i) {
        if(currentDot === dots[i]) {
            return i;
        }
    }
    return - 1;
}


clickArrowHandler = function(event) {
    let sliders = getSliders();
    let dots = getDots();

    let currentIndex = getActiveIndex(sliders);

    toggleByIndex(currentIndex, sliders, dots);

    if (event.target.classList.contains('slider__arrow_prev')) {
        --currentIndex; 
    } else {
        ++currentIndex;
    }

    currentIndex = getCorrectIndex(currentIndex, sliders);
    toggleByIndex(currentIndex, sliders, dots);
}

clickDotHandler = function(event) {
    let sliders = getSliders();
    let dots = getDots();

    let currentIndex = getActiveIndex(sliders);
    toggleByIndex(currentIndex, sliders, dots);

    let newIndex = getDotIndex(event.target, dots);
    toggleByIndex(newIndex, sliders, dots);
}

function main() {
    let arrows = getArrows();
    let sliders = getSliders();
    let dots = getDots();
    let currentSliderIndex = getActiveIndex(sliders);

    dots[currentSliderIndex].classList.add('slider__dot_active');

    for(let arrow of arrows) {
        arrow.onclick = clickArrowHandler;
    }

    for(let dot of dots) {
        dot.onclick = clickDotHandler;
    }

}

main();