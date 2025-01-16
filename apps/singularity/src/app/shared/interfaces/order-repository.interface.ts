import { Observable } from "rxjs";
import { SaveOrder } from "./types/order.type";

export default interface OrderRepository {


    save(body: SaveOrder): Observable<string>
}