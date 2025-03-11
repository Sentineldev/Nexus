import { Observable } from "rxjs";
import CategoryProduct from "../classes/category-product.class";
import { PageData, PageFilter } from "../types/pagination";
import { IsActiveValues } from "../types/globa";
export type CategoryProductFilter = {
    categoryId: string;
}
export type AllProductsFilter = {
    restaurantId: string;
    menuId: string;
    search: string;
}



export type SaveCategoryProduct = {
    categoryId: string;
    productId: string;
    price: number;
    count: number;
};

export type UpdateCategoryProduct = {
    price: number;
    count: number;
    isActive: IsActiveValues;
};

export default interface CategoryProductRepository {


    save(body: SaveCategoryProduct): Observable<string>;
    update(id: string, body: UpdateCategoryProduct): Observable<string>;
    delete(id: string): Observable<string>
    getById(id: string): Observable<CategoryProduct | undefined>;
    getPage(filter: PageFilter<CategoryProductFilter>): Observable<PageData<CategoryProduct>>
    getAllProductsPaginate(filter: PageFilter<AllProductsFilter>): Observable<PageData<CategoryProduct>>
}