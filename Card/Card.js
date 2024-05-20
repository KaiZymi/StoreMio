document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = CATALOG.find((item) => item.id === productId);

    if (product) {
        const productDetails = document.getElementById("productDetails");
        productDetails.innerHTML = `
        <div class="product-card__block">
        <div class="product-card__block-slider">
            <div thumbsSlider="" class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide swiper-slide-mini">
                        <img src="./imgCard/${product.images[0]}" />
                    </div>
                    <div class="swiper-slide swiper-slide-mini">
                        <img src="./imgCard/${product.images[1]}" />
                    </div>
                    <div class="swiper-slide swiper-slide-mini">
                        <img src="./imgCard/${product.images[1]}" />
                    </div>
                </div>
            </div>
    
            <div
                style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                class="swiper mySwiper2"
            >
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div style = "height: 100% ;"> 
                        <video width="100%"  controls>
                            <source  src="./video/${product.video}" type="video/mp4">
                
                        </video> 
                        </div>
                        
                    </div>
                    <div class="swiper-slide swiper-slide-max">
                        <img src="./imgCard/${product.images[0]}" />
                    </div>
                    <div class="swiper-slide swiper-slide-max">
                        <img src="./imgCard/${product.images[1]}" />
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    
        <div class="product-card__block-info">
            <div class="product-card__block-info-head">
                <h2 class="product-card__block-info-head-title">${product.name}</h2>
                <p class="product-card__block-info-head-article">${product.article}</p>
                <p class="product-card__block-info-head-description">${product.description}</p>
            </div>

            <div class="product-card__block-info-buttons">
                <button class="product-card__block-info-button-add button">Добавить в корзину</button>
                <button class="product-card__block-info-button-remove button">Удалить из корзины</button>
            </div>

            <div class="product-card__block-info-purchase">
                <p class="product-card__block-info-price">Цена: ${product.price}</p>
                <p class="product-card__block-info-delivery">Срок доставки: ${product.delivery}</p>
            </div>
        </div>

    </div>;
                `;
    } else {
        const productDetails = document.getElementById("productDetails");
        productDetails.innerHTML = "<p>Product not found.</p>";
    }

    /* Считаю сколько у меня товара */
    function updateRemoveButtonState(productId) {
        const productsStore = localStorageUtil.getProducts();
        let count = productsStore.reduce((acc, cur) => {
            return acc[cur] ? ++acc[cur] : (acc[cur] = 1), acc;
        }, {});

        const productCount = count[productId] || 0;
        const removeButton = document.querySelector(
            ".product-card__block-info-button-remove"
        );

        if (removeButton) {
            if (productCount <= 0) {
                removeButton.setAttribute("disabled", "disabled");
            } else {
                removeButton.removeAttribute("disabled");
            }
        }
    }

    /* Ниже логика всплывающего окна и т.д. */

    updateRemoveButtonState(productId);

    let currentPopup = null;

    const addButton = document.querySelector(
        ".product-card__block-info-button-add"
    );
    const removeButton = document.querySelector(
        ".product-card__block-info-button-remove"
    );

    if (addButton) {
        addButton.addEventListener("click", function () {
            // Добавление товара в корзину
            localStorageUtil.putProducts(productId);
            updateRemoveButtonState(productId);
            // Скрыть текущее отображаемое всплывающее окно
            if (currentPopup) {
                currentPopup.style.display = "none";
            }

            // Показать новое всплывающее окно
            const popup = document.querySelector(".popup");
            if (popup) {
                popup.style.display = "block";
                currentPopup = popup;
                setTimeout(function () {
                    popup.style.display = "none";
                }, 2000); // Скрыть через 2 секунды
            }
        });
    }

    if (removeButton) {
        removeButton.addEventListener("click", function () {
            // Удаление товара из корзины
            localStorageUtil.deleteProducts(productId);
            updateRemoveButtonState(productId);
            // Скрыть текущее отображаемое всплывающее окно
            if (currentPopup) {
                currentPopup.style.display = "none";
            }

            // Показать новое всплывающее окно
            const popup = document.querySelector(".popup-remove");
            if (popup) {
                popup.style.display = "block";
                currentPopup = popup;
                setTimeout(function () {
                    popup.style.display = "none";
                }, 2000); // Скрыть через 2 секунды
            }
        });
    }

    /* Задизейблить кнопку, переместить в утилс позже */

    /* Логика свайпера */
    var swiperThumbs = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 10,
        direction: "vertical",
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper = new Swiper(".mySwiper2", {
        loop: true,

        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiperThumbs,
        },
    });
});
