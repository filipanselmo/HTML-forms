const dropdownList = document.querySelectorAll('.dropdown');


function clickDropValue(event) {
    const parent = this.closest(".dropdown");
    const dropList = parent.querySelector('.dropdown__list');

    dropList.classList.toggle('dropdown__list_active')
}

function selectNewValue(event) {
    event.preventDefault();

    const parent = this.closest(".dropdown");
    const dropValue = parent.querySelector('.dropdown__value');
    const dropList = parent.querySelector('.dropdown__list');

    dropValue.textContent = event.target.textContent;
    dropList.classList.toggle('dropdown__list_active')
}


function main() {
    for(let dropdown of dropdownList) {
        const dropValue = dropdown.querySelector('.dropdown__value');
        dropValue.addEventListener('click', clickDropValue);

        const links = dropdown.querySelectorAll('.dropdown__link');
        for(let el of links) {
            el.addEventListener('click', selectNewValue);
        }
    }
}

main();