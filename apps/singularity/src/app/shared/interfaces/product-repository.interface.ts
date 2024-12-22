import { Observable } from "rxjs";
import Product from "../../pages/products/classes/product.class";
import { SaveProduct } from "../../pages/products/dto/product.dto";
import { PageFilter, PageData } from "../types/pagination";

export default interface ProductRepository {
    save(body: SaveProduct): Observable<string>

    update(id: string, body: SaveProduct): Observable<string>
    delete(id: string): Observable<string>
    getById(id: string): Observable<Product | undefined>
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>>
}