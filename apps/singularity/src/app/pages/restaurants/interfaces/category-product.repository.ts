import { Observable } from "rxjs";
import { SaveCategoryProduct, UpdateCategoryProduct } from "../dto/category-product.dto";
import CategoryProduct from "../classes/category-product.class";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { AllProductsFilter, CategoryProductFilter } from "../repositories/category-product.repository";

export default interface CategoryProductRepository {


    save(body: SaveCategoryProduct): Observable<string>;
    update(id: string, body: UpdateCategoryProduct): Observable<string>;
    delete(id: string): Observable<string>
    getById(id: string): Observable<CategoryProduct | undefined>;
    getPage(filter: PageFilter<CategoryProductFilter>): Observable<PageData<CategoryProduct>>
    getAllProductsPaginate(filter: PageFilter<AllProductsFilter>): Observable<PageData<CategoryProduct>>
}