class LocalStorageUtil {
    constructor() {
        this.keyName = "products";
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(id) {
        let products = this.getProducts();
        products.push(id);
        localStorage.setItem(this.keyName, JSON.stringify(products));

        return products;
    }

    deleteProducts(id) {
        let products = this.getProducts();
        const index = products.indexOf(id);
        products.splice(index, 1);

        localStorage.setItem(this.keyName, JSON.stringify(products));

        return { products };
    }
}

const localStorageUtil = new LocalStorageUtil();
