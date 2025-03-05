export type SaveCategoryProduct = {
    categoryId: string;
    productId: string;
    price: number;
    count: number;
};

export type UpdateCategoryProduct = {
    price: number;
    count: number;
    isActive: boolean;
};