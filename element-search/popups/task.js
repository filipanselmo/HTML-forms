let modal = document.querySelector('#modal_main');
modal.classList.add('modal_active');
let modalSuccess = document.querySelector('#modal_success');

let buttonsClose = document.querySelectorAll('.modal__close');
let buttonSuccess = modal.querySelector('.show-success');


for(let btn of buttonsClose) {
    btn.onclick = function(event) {
        parent = this.closest('.modal');
        parent.classList.remove('modal_active');
    }
}


buttonSuccess.onclick = function() {
    parent = this.closest('.modal');
    parent.classList.remove('modal_active');
    modalSuccess.classList.add('modal_active');
};