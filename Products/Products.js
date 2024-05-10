class Products {
    constructor() {
        this.classNameActive = "catalog__card-button-active";
    }

    handleSetLocationStorage(element, id) {
        const result = localStorageUtil.putProducts(id);

        element.classList.add(this.classNameActive);

        
    }

    render() {
        const productStore = localStorageUtil.getProducts();
        let htmlCatalog = "";

        CATALOG.forEach(({ id, name, article, img, description, price }) => {
            let activeClass = "";

            if (productStore.indexOf(id) > -1) {
                activeClass = " " + this.classNameActive;
            }

            htmlCatalog += `
            <li class="catalog__item">
            <div class="catalog__card">
                <div class="catalog__card-top">
                    <a class="catalog__card-product" href="">
                        <p class="catalog__card-title">${name}</p>

                        <span class="catalog__card-article" style="color: var(--color-gray);">Артикул: ${article}</span>
                        <img src="./imgCard/${img}" alt="" style="width: 100%; min-height: 200px">
                    </a>

                </div>
                <div class="catalog__card-bottom">
                    <p class="catalog__card-description">${description}</p>
                    <p>Срок доставки: до 5 дней</p>
                    <div class="catalog__card-buy">
                        <div class="catalog__card-price">${price}р</div>
                        
                        <button class="catalog__card-button ${activeClass}" onclick = "productsPage.handleSetLocationStorage(this, '${id}')"></button>
                        
                    </div>

                </div>
            </div>
        </li>
            
            `;
        });

        const html = `
            <ul class="catalog__body">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();

productsPage.render();
