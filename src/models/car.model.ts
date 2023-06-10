export class Car {
    productName?: string;
    price?: string;
    category_id?: number;

    constructor({ productName, price, category_id }) {
        if (productName !== undefined) this.productName = productName;
        if (price !== undefined) this.price = price;
        if (category_id !== undefined) this.category_id = category_id;
    }
}