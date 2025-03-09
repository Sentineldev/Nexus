import { Observable } from "rxjs";

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
    total: number;
};

export default interface OrderRepository {


    save(body: SaveOrder): Observable<string>
}