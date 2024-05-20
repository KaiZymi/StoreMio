class Products {
    constructor() {
        this.classNameActive = "catalog__card-button-active";
    }

    handleSetLocationStorage(element, id) {
        const result = localStorageUtil.putProducts(id);

        element.classList.add(this.classNameActive);

        // Добавление всплывающего окна
        const popup = document.querySelector(".popup");
        popup.style.display = "block";
        setTimeout(function () {
            popup.style.display = "none";
        }, 2000); // Скрыть через 2 секунды
    }

    handleImageHover(imageElement, gifProduct) {
        const originalSrc = imageElement.src;
        let isGifShowing = false;

        imageElement.addEventListener("mouseover", () => {
            if (!isGifShowing) {
                imageElement.src = `./gifs/${gifProduct}`; // При наведении показываем gifProduct
                isGifShowing = true;
            }
        });

        imageElement.addEventListener("mouseout", () => {
            imageElement.src = originalSrc; // При уходе показываем images[0]
            isGifShowing = false;
        });
    }

    render() {
        const productStore = localStorageUtil.getProducts();
        let htmlCatalog = "";

        CATALOG.forEach(({ id, name, article, images, description, price }) => {
            let activeClass = "";

            if (productStore.indexOf(id) > -1) {
                activeClass = " " + this.classNameActive;
            }

            htmlCatalog += `
            <li class="catalog__item">
            <div class="catalog__card">
                <div class="catalog__card-top">
                    <a class="catalog__card-product" href="product-card.html?id=${id}">
                        <p class="catalog__card-title">${name}</p>

                        <span class="catalog__card-article" style="color: var(--color-gray);">Артикул: ${article}</span>

                        

                        <img src= "./imgCard/${images[0]}" id = "catalog-img" class = "catalog__card-top-image"
                        style ="width: 100%; min-height: 180px;"
                        >
                        
                        

                        
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

        const imageElements = document.querySelectorAll(
            ".catalog__card-top-image"
        );
        imageElements.forEach((imageElement, index) => {
            console.log(index);
            this.handleImageHover(
                imageElement,
                CATALOG[index].gifProduct,
                CATALOG[index].images[0]
            );
        });
    }
}

const productsPage = new Products();

productsPage.render();

/* Логика прокрутки до секции каталога */
document.querySelector(".hero__button").addEventListener("click", function () {
    document.querySelector(".catalog").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".product__button").forEach((button) => {
    button.addEventListener("click", function () {
        document
            .querySelector(".catalog")
            .scrollIntoView({ behavior: "smooth" });
    });
});
