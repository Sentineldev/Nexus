export type SaveOrder = {
    clientId: string;
    type: string;
    total: number;
    location: string;
    products: SaveOrderProduct[];
};
export type SaveOrderProduct = {
    productId: string;
    quantity: number;
};