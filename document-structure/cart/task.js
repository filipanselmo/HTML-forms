const cartHTML = document.querySelector(".cart");
const productsListHTML = document.querySelectorAll(".product");
const storage = window.localStorage;


class ElementTransit {
    static absolutePositionClass = "product-shadow";

    static move(element, position) {
        element.style.left = `${position.left}px`;
        element.style.top = `${position.top}px`;
    }

    static createShadow(element) {
        const shadow = element.cloneNode(true);
        shadow.classList.add(this.absolutePositionClass);
        element.insertAdjacentElement("beforeBegin", shadow);
        return shadow;
    }

    static shadowTransition(element, endPosition, tickCount, secondTransition) {
        const rect = element.getBoundingClientRect();
        const startPosition = {left: rect.left, top: rect.top};
    
        const timeTransition = secondTransition * 1000;

        const shadow = this.createShadow(element);
    
        this.move(shadow, startPosition);
        const leftStep = (endPosition.left - startPosition.left) / tickCount;
        const topStep = (endPosition.top - startPosition.top) / tickCount
        
        // сам перенос
        let currentTickNumber = 1;
        const interval = setInterval(() => {
            const newPosition = {
                left: startPosition.left + leftStep * currentTickNumber, 
                top: startPosition.top + topStep * currentTickNumber,
            };

            this.move(shadow, newPosition);

            ++currentTickNumber;

            if(currentTickNumber >= tickCount) {
                clearInterval(interval);
                shadow.remove();
            }

        }, timeTransition / tickCount);
    };
}

class CartProduct {
    constructor(product, count, index) {
        this.index = index; // чтобы отслеживать порядок добавления при загрузке
        this.productHTML = document.createElement("div");
        this.productHTML.classList.add("cart__product");
        this.productHTML.dataset["id"] = product.id;
        this.productHTML.innerHTML = `
            <img class="cart__product-image" src="${product.imageSrc}">
            <div class="cart__product-count">${count}</div>`
        
        this.countHTML = this.productHTML.querySelector(".cart__product-count");
        this.imageHTML = this.productHTML.querySelector(".cart__product-image");
    }

    get HTML() {
        return this.productHTML;
    }

    get count() {
        return +this.countHTML.textContent;
    }

    get imagePosition() {
        const rect = this.imageHTML.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
        }
    }

    set count(value) {
        value = +value;
        this.countHTML.textContent = value;
    }

    addProduct(count) {
        this.count = this.count + count;
    }

    removeProduct(count) {
        this.count = this.count - count;
    }

    remove() {
        this.productHTML.remove();
    }
}


class Cart {
    constructor(cartHTML) {
        this.currentIndex = 0; // чтобы отслеживать порядок добавления при загрузке
        this.cartHTML = cartHTML;
        this.cartProductHTML = cartHTML.querySelector(".cart__products");
        this.products = {};
        this.changeDisplay();
    }

    saveStorage(storage) {
        let cartProducts = [];
        for(const [key, el] of Object.entries(this.products)) {
            const state = {
                id: key,
                index: el.index,
                count: el.count,
            };
            cartProducts.push(state);
        }

        cartProducts = cartProducts.sort((a, b) => a.index - b.index);
        storage.setItem("cartProducts", JSON.stringify(cartProducts));
    }

    loadStorage(storage, products) {
        let cartProducts = storage.getItem("cartProducts");
        if(!cartProducts) {
            return;
        }
        cartProducts = JSON.parse(cartProducts);

        for(const cartProduct of cartProducts) {
            if(!products[cartProduct.id]) {
                continue;
            }

            this.addProduct(products[cartProduct.id], cartProduct.count);
        }
        this.changeDisplay();
    }

    changeDisplay() {
        if(Object.keys(this.products).length === 0) {
            this.cartHTML.classList.add("hiden");
        } else {
            this.cartHTML.classList.remove("hiden");
        }
    }

    addProduct(product, count) {
        if(this.products[product.id]) {
            this.products[product.id].addProduct(count);
        } else {
            this.products[product.id] = new CartProduct(product, count, this.currentIndex++);
            this.cartProductHTML.insertAdjacentElement("beforeEnd", this.products[product.id].HTML);
        } 
        this.changeDisplay();

        const cartProduct = this.products[product.id];

        ElementTransit.shadowTransition(product.imageHTML, cartProduct.imagePosition, 10, 0.1);
    }

    removeProduct(product, count) {
        if(!this.products[product.id]) {
            return;
        }
        const cartProduct = this.products[product.id];

        if(cartProduct.count <= count) {
            cartProduct.remove();
            delete this.products[product.id];
        } else {
            cartProduct.removeProduct(count);
        }

        this.changeDisplay();
    }
}

class Product {
    constructor(productHTML) {
        this._productHTML = productHTML;
        this._valueHTML = this._productHTML.querySelector(".product__quantity-value");
        this._imageHTML = this._productHTML.querySelector(".product__image");

        this.addControlEvent();
    }

    get id() {
        return this._productHTML.dataset["id"];
    }

    get count() {
        return +this._valueHTML.textContent;
    }

    get imageSrc() {
        return this._imageHTML.getAttribute("src");
    }

    get imageHTML() {
        return this._imageHTML;
    }

    get HTML() {
        return this._productHTML;
    }

    set count(value) {
        value = +value;

        if(value < 1) {
            value = 1;
        }

        this._valueHTML.textContent = value;
    }

    addControlEvent() {
        const inc = this._productHTML.querySelector(".product__quantity-control_inc");
        const dec = this._productHTML.querySelector(".product__quantity-control_dec");

        inc.addEventListener("click", event => {
            this.count = this.count + 1;
        });
    
        dec.addEventListener("click", event => {
            this.count = this.count - 1;
        });
    }

    addCartEvent(cart) {
        const addButton = this._productHTML.querySelector(".product__add");
        const removeButton = this._productHTML.querySelector(".product__remove");

        addButton.addEventListener("click", event => {
            cart.addProduct(this, this.count);
            cart.saveStorage(storage);
        });

        removeButton.addEventListener("click", event => {
            cart.removeProduct(this, this.count);
            cart.saveStorage(storage);
        });
    }
};





const products = {};
for(const productHTML of productsListHTML) {
    const product = new Product(productHTML)
    products[product.id] = product;
}

const cart = new Cart(cartHTML);
cart.loadStorage(storage, products)

for(const [key, el] of Object.entries(products)) {
    el.addCartEvent(cart);
}