import Product from "./product.class";
import MenuCategory from "./menu-category.class";

export type CategoryProductParams = {
    id: string;
    product: Product;
    category: MenuCategory;
    price: number;
    count: number;
    isActive: boolean;
}

export default class CategoryProduct {
    public id: string;
    public product: Product;
    public category: MenuCategory;
    public price: number;
    public isActive: boolean;
    public count: number;


    constructor(params: CategoryProductParams) {
        const { category, id, isActive, price, product, count } = params;


        this.category = category;
        this.id = id;
        this.isActive = isActive;
        this.price = price;
        this.count = count;
        this.product = product;
    }
}