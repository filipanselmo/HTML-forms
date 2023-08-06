const tooltipReferences = document.querySelectorAll(".has-tooltip");

class Tooltips {
    constructor(tooltipReferences) {
        this.referenceList = Array.from(tooltipReferences);
        this.currentActiveIndex = -1;

        this.createTooltipsList();
        
    }

    createTooltipsList() {
        this.tooltipList = Array(tooltipReferences.length).fill(null);
        for(const [index, reference] of this.referenceList.entries()) {
            const tooltip = this.createTooltip(reference);
            this.tooltipList[index] = tooltip;
            reference.insertAdjacentElement("afterEnd", tooltip);
        }
    }

    tooltipMovePosition(index) {
        const reference = this.referenceList[index]
        const postion = reference.dataset["position"];
        const tooltip = this.tooltipList[index];
        const rectRefence = reference.getBoundingClientRect();
        let rectTooltip = tooltip.getBoundingClientRect();

        //чтобы можно было вытащить rect от подсказки она должен быть отрисована
        //только на данных rect от ссылки не удается корректно поместить подсказку над ссылкой и слева от нее
        if(!tooltip.classList.contains("tooltip_active")) {
            this.activateTootltip(index);
            rectTooltip = tooltip.getBoundingClientRect();
            this.deactivateTootltip(index); 
        }
      
        
        if(!postion) {
            tooltip.setAttribute("style", `left: ${rectRefence.left}px; top: ${rectRefence.bottom}px`);
            return;
        }

        switch(postion) {
            case "left": 
                tooltip.setAttribute("style", `left: ${rectRefence.left - rectTooltip.width}px; top: ${rectRefence.top}px`);
                break;
            case "right":
                tooltip.setAttribute("style", `left: ${rectRefence.right}px; top: ${rectRefence.top}px`);
                break;
            case "top":
                tooltip.setAttribute("style", `left: ${rectRefence.left}px; top: ${rectRefence.top - rectTooltip.height}px`);
                break;
            default:
                tooltip.setAttribute("style", `left: ${rectRefence.left}px; top: ${rectRefence.bottom}px`);
        }
    }


    createTooltip(reference) {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.innerText = reference.getAttribute("title");
        
        return tooltip;
    }

    clearAllTooltip() {
        for(let el of this.tooltipList) {
            el.classList.remove("tooltip_active")
        }
        this.currentActiveIndex = -1;
    }

    activateTootltip(index) {
        this.tooltipList[index].classList.add("tooltip_active")
    }

    deactivateTootltip(index) {
        this.tooltipList[index].classList.remove("tooltip_active")
    }

    addListener() {
        for(const [index, reference] of tooltipReferences.entries()) {
            reference.addEventListener("click", event => {
                event.preventDefault();

                if(index === this.currentActiveIndex) {
                    this.clearAllTooltip();
                    return;
                }

                this.clearAllTooltip();
                this.tooltipMovePosition(index);
                this.activateTootltip(index);
                this.currentActiveIndex = index;
            });
        }
    }
}

const tooltips = new Tooltips(tooltipReferences);
tooltips.addListener();

this.addEventListener("scroll", event => {
    tooltips.clearAllTooltip();
});