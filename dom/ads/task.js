const rotatorsList = document.querySelectorAll(".rotator");
const rotatorsStates = Array(rotatorsList.length).fill(0).map((el, index) => {
    let cases = rotatorsList[index].querySelectorAll(".rotator__case");

    return {
        cases: cases,
        currentIndex: 0,
        timer: 0,
        minSpeed: getMinSpeed(cases)
    }}
);

function setDefaultRotatorState(rotatorsStates) {
    for(const [index, rotator] of rotatorsStates.entries()) {

        const rotatorCases = rotatorsStates[index].cases;
        for(let rotatorCase of rotatorCases) {
            rotatorCase.classList.remove("rotator__case_active");
        }

        const state = rotatorsStates[index];

        rotatorCases[state.currentIndex].classList.add("rotator__case_active");
    }
}

// speed ms
function getMinSpeed(rotatorCases, defaultMinSpeed=1000) {
    let minSpeed = defaultMinSpeed;

    for(let rotatorCase of rotatorCases) {
        const speed = rotatorCase.dataset["speed"];
        if(speed !== undefined) {
            minSpeed = Math.min(speed, minSpeed);
        }
    }

    const numberCounts = minSpeed.toString().split('').length;

    return Math.pow(10, numberCounts - 1);
}

function setColor(rotatorCase) {
    const color = rotatorCase.dataset["color"];
    if(color !== undefined) {
        rotatorCase.style.color = color;
    } else {
        rotatorCase.style.color = 'black';
    }
}

function getSpeed(rotatorCase, defaultMinSpeed=1000) {
    const speed = rotatorCase.dataset["speed"];
    if(speed === undefined) {
        return defaultMinSpeed;
    }
    return speed;
}


function rotate(rotatorIndex) {
    const state = rotatorsStates[rotatorIndex];
    const speed = getSpeed(state.cases[state.currentIndex]);

    if(state.timer < speed) {
        state.timer += state.minSpeed;
        return;
    }

    state.timer = 0;
    const rotatorCase = state.cases[state.currentIndex];
    rotatorCase.classList.remove("rotator__case_active");

    if(state.currentIndex === state.cases.length - 1) {
        state.currentIndex = 0;
    } else {
        state.currentIndex++;
    }

    const newRotatorCase = state.cases[state.currentIndex];
    newRotatorCase.classList.add("rotator__case_active");
    setColor(newRotatorCase);
}


function main() {
    setDefaultRotatorState(rotatorsStates);
    for(const [index, rotator] of rotatorsList.entries()) {
        setInterval(rotate, rotatorsStates[index].minSpeed, index);
    }
}

main();