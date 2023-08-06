const tabsList = document.querySelectorAll(".tabs");




function getActiveTabIndex(tabs) {
    for(let i = 0; i < tabs.length; ++i) {
        if(tabs[i].classList.contains("tab_active")) {
            return i;
        }
    }
    return -1;
}

function getIndexTab(currentTab, tabs) {
    for(let i = 0; i < tabs.length; ++i) {
        if(tabs[i] === currentTab) {
            return i;
        }
    }
    return -1;
}

function toggleTab(oldIndex, newIndex, tabs, tabsContent) {
    tabs[oldIndex].classList.toggle("tab_active");
    tabsContent[oldIndex].classList.toggle("tab__content_active")

    tabs[newIndex].classList.toggle("tab_active");
    tabsContent[newIndex].classList.toggle("tab__content_active")
}


function clickTabHandler(event) {
    const parent = this.closest(".tabs");

    const tabs = parent.getElementsByClassName("tab");
    const tabsContent = parent.getElementsByClassName("tab__content");

    let index = getActiveTabIndex(tabs);
    let newIndnex = getIndexTab(event.target, tabs);
    toggleTab(index, newIndnex, tabs, tabsContent);
}


function main() {
    for(let tabField of tabsList) {
        const tabs = tabField.getElementsByClassName("tab");

        for(let tab of tabs) {
            tab.addEventListener("click", clickTabHandler);
        }
    }
}

main();