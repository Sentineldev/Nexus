import { Observable } from "rxjs";
import { SaveProduct } from "../dto/product.dto";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import Product from "../classes/product.class";

export default interface ProductRepository {
    save(body: SaveProduct): Observable<string>
    getById(id: string): Observable<Product | undefined>
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>>
}