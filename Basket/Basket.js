class Basket {
    handleSetLocationStorage(element, id) {
        const result = localStorageUtil.putProducts(id);

        /* basketPage.render(count[id]); */
    }

    handleRemoveLocationStorage(element, id) {
        const result = localStorageUtil.deleteProducts(id);
    }

    render(count) {
        /* const productStore = localStorageUtil.getProducts(); */
        let htmlBasket = "";

        CATALOG.forEach(
            ({ id, name, article, gifProduct, img, description, price }) => {
                if (count[id] > 0) {
                    htmlBasket += `
                    <li class="basket__item" id="basketItem${id}">
                    <div class="basket__item-select">
                        <div class="basket__item-select-box">
                            <input type="checkbox" id="check${id}" class="basket__item-select-box-check">
                            <label style="user-select: none;" for="check${id}"></label>
                        </div>
                        <img alt="" class="basket__item-select-img" style = " --gif-image:url('../gifs/${gifProduct}');
                        --back-image: url('../imgCard/${img}');
                        ">
                    </div>
                    <div class="basket__item-options">
                        <div class="basket__item-info">
                            <div class="basket__item-title">${name}</div>
                            <div class="basket__item-description hidden-mobile">${description}</div>
                            <div class="basket__item-article" style="color: var(--color-gray);">${article}
                            </div>
            
                        </div>
                        <div class="basket__item-buy">
                            <div class="basket__item-price">${price} р.</div>
                            
                            <div class="basket__item-counter">
                                <span class="basket__item-counter-add button-counter"><button class = " basket__item-counter-add-button" onclick=" basketPage.handleSetLocationStorage(this, '${id}') " ></button></span>

                                <div class="basket__item-count">
                                
                                    <input type"text" disabled value="${count[id]}">
                                
                                
                                </div>

                                <span class="basket__item-counter-remove button-counter">
                                <button class = "  basket__item-counter-remove-button " onclick=" basketPage.handleRemoveLocationStorage(this, '${id}') " ></button>
                                </span>
            
                            </div>
            
                        </div>
                    </div>
                </li>
                    `;
                }
            }
        );

        const html = `
            <ul class="basket__list">
                ${htmlBasket}
            </ul>
        `;

        ROOT_BASKET_PRODUCTS.innerHTML = html;
    }
}

const basketPage = new Basket();
const productsStore = localStorageUtil.getProducts();

let count = productsStore.reduce((acc, cur) => {
    return acc[cur] ? ++acc[cur] : (acc[cur] = 1), acc;
}, {});

basketPage.render(count);

const buttonsAdd = document.querySelectorAll(
    ".basket__item-counter-add-button"
);
const buttonsRemove = document.querySelectorAll(
    ".basket__item-counter-remove-button"
);
const counters = document.querySelectorAll(".basket__item-count input");

buttonsAdd.forEach((button, index) => {
    button.addEventListener("click", () => {
        let count = parseInt(counters[index].value);
        count++;
        counters[index].value = count;
    });
});

buttonsRemove.forEach((button, index) => {
    button.addEventListener("click", () => {
        let count = parseInt(counters[index].value);
        if (count > 0) {
            count--;
            counters[index].value = count;

            if (count === 0) {
                console.log(count, index);
                const basketItemToRemove = button.closest(".basket__item");

                console.log(basketItemToRemove);
                if (basketItemToRemove) {
                    basketItemToRemove.remove();
                }
            }
        }
    });
});

function toggleCheckboxes(checkbox) {
    const allCheckboxes = document.querySelectorAll(
        ".basket__item-select-box-check"
    );

    allCheckboxes.forEach((item) => {
        item.checked = checkbox.checked;
    });
}
