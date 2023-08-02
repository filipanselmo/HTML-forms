const interestsMain = document.querySelector(".interests_main")
const inputList = getChildrenInput(interestsMain.querySelector("ul"), "interests");

function getChildrenInput(element, parentClass="interest") {
    const parent = element.closest(`.${parentClass}`);
    const ul = Array.from(parent.children).find(el => el.tagName === "UL");
    if(!ul) {
        return [];
    }

    const inputList = Array.from(ul.children).filter(el => el.tagName === "LI");                                  
    return inputList.map(el => Array.from(el.children).find(el => el.tagName === "LABEL"));
}


class CheckboxNode {
    constructor(element, parent=null) {
        this.element = element.querySelector("input");
        this.parent = parent;
        this.childrenList = [];

        const children = getChildrenInput(element);
        if(!children) {
            return;
        }

        this.childrenList = children.map(child => new CheckboxNode(child, this));        
    }

    toggle() {
        this.setCheckedValue(this.element.checked); 
        this.setParentChecked();    
    }

    setCheckedValue(value, withChildren=true) {
        this.element.checked = value;
        if(withChildren) {
            this.setChildrenChecked(value);
        }   
    }

    setParentChecked() {
        if(!this.parent) {
            return;
        }

        const countChildrenChecked = this.parent.childrenList.reduce((prev, cur) => prev + (+cur.element.checked), 0);
        const countChildrenIntermediant = this.parent.childrenList.reduce((prev, cur) => prev + (+cur.element.indeterminate), 0);

        if(countChildrenChecked === this.parent.childrenList.length) {
            this.parent.setCheckedValue(true, false);
            this.parent.element.indeterminate = false;
        } else if (countChildrenChecked === 0 && countChildrenIntermediant === 0) {
            this.parent.setCheckedValue(false, false);
            this.parent.element.indeterminate = false;
        } else {
            this.parent.element.indeterminate = true;
        }

        this.parent.setParentChecked();
    }

    setChildrenChecked(value) {
        this.childrenList.forEach(el => el.setCheckedValue(value));
    }

    addEvent() {
        this.element.addEventListener("change", event => {
            this.toggle();
        });

        this.childrenList.forEach(el => el.addEvent());
    }
}

inputList.forEach(el => new CheckboxNode(el).addEvent())