import Product from "../../products/classes/product.class";

export type SaveCategoryProduct = {
    categoryId: string;
    productId: string;
    price: number;
    isEnabled: boolean;
};