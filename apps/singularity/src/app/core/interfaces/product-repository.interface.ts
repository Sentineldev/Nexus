import { Observable } from "rxjs";
import { PageFilter, PageData } from "../types/pagination";
import Product from "../classes/product.class";

export type SaveProduct = {
    name: string;
    description: string;
    group: string;
}

export default interface ProductRepository {
    save(body: SaveProduct): Observable<string>

    update(id: string, body: SaveProduct): Observable<string>
    delete(id: string): Observable<string>
    getById(id: string): Observable<Product | undefined>
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>>
}