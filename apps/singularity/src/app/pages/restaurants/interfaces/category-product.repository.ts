import { Observable } from "rxjs";
import { SaveCategoryProduct } from "../dto/category-product.dto";
import CategoryProduct from "../classes/category-product.class";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { CategoryProductFilter } from "../repositories/category-product.repository";

export default interface CategoryProductRepository {


    save(body: SaveCategoryProduct): Observable<string>;
    delete(id: string): Observable<string>
    update(id: string, body: SaveCategoryProduct): Observable<string>
    getById(id: string): Observable<CategoryProduct | undefined>;
    getPage(filter: PageFilter<CategoryProductFilter>): Observable<PageData<CategoryProduct>>
}