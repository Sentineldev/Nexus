export type SaveCategoryProduct = {
    categoryId: string;
    productId: string;
    price: number;
};

export type UpdateCategoryProduct = {
    price: number;
    isActive: boolean;
};