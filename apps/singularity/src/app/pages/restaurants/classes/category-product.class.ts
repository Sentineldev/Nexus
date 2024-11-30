import Product from "../../products/classes/product.class";
import MenuCategory from "./menu-category.class";

export type CategoryProductParams = {
    id: string;
    product: Product;
    category: MenuCategory;
    price: number;
    isEnabled: boolean;
}

export default class CategoryProduct {
    public id: string;
    public product: Product;
    public category: MenuCategory;
    public price: number;
    public isEnabled: boolean;


    constructor(params: CategoryProductParams) {
        const { category, id, isEnabled, price, product } = params;


        this.category = category;
        this.id = id;
        this.isEnabled = isEnabled;
        this.price = price;
        this.product = product;
    }
}