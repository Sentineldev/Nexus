import Product from "../../products/classes/product.class";
import MenuCategory from "./menu-category.class";

export type MenuProductParams = {
    id: string;
    product: Product;
    category: MenuCategory;
    price: number;
}

export default class MenuProduct {

    public id: string;
    public product: Product;
    public category: MenuCategory;
    public price: number;

    constructor(params: MenuProductParams) {

        const { category, id, price, product } = params;
    
        this.id = id;
        this.price = price;
        this.category = category;
        this.product = product;
    }

}