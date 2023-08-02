menuList = document.querySelectorAll('.menu_main');

function clearActiveMenu(menu) {
    for(let item of menu.querySelectorAll('.menu_sub')) {
        item.classList.remove('menu_active');
    }
}

clickMenuHandler = function(event) {
    
    let parent = event.target.closest('.menu__item')
    
    let sub = parent.querySelector('.menu_sub');

    if (sub === null) {
        return true;
    }

    event.preventDefault()

    let isActive = sub.classList.contains('menu_active');

    let menu = parent.closest('.menu');
    clearActiveMenu(menu);

    if(isActive) {
        sub.classList.remove('menu_active');
    } else {
        sub.classList.add('menu_active');
    }
}

for(menu of menuList) {
    let items = menu.querySelectorAll('.menu__link');
    for(let el of items) {
        el.onclick = clickMenuHandler;
    };
}