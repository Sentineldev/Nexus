import { map, Observable, of } from "rxjs";
import { PageFilter, PageData } from "../types/pagination";
import CategoryProduct from "../classes/category-product.class";
import CategoryProductRepository, { AllProductsFilter, CategoryProductFilter, SaveCategoryProduct, UpdateCategoryProduct } from "../interfaces/category-product.repository";
import { Injectable } from "@angular/core";
import { PRODUCTS, MENU_CATEGORIES, CATEGORY_PRODUCTS } from "../data/variables";



@Injectable({
    providedIn: "root"
})
export default class LocalCategoryProductRepository implements CategoryProductRepository {
   
    save(body: SaveCategoryProduct): Observable<string> {

        const { categoryId, price, productId,count } = body;



        const product = PRODUCTS.find((product) => product.id === productId);

        const category = MENU_CATEGORIES.find((category) => category.id === categoryId);

        const exists = CATEGORY_PRODUCTS.find((val) => val.product.id === productId && val.category.id === categoryId);

        if (exists) {

            return of("Not created");
        }
        
        if (product && category) {
            const id = new Date().getTime().toString();
            const newProduct = new CategoryProduct({
                category,
                product,
                id,
                isActive: false,
                price,
                count: count,
            });
            CATEGORY_PRODUCTS.push(newProduct);
            return of("Created");
        }
        return of("Not created");
    }
    delete(id: string): Observable<string> {

        const result = CATEGORY_PRODUCTS.findIndex((val) => val.id === id);

        if (result === -1) {
            return of("Not deleted");
        }

        CATEGORY_PRODUCTS.splice(result, 1);

        return of("Deleted");


    }
    update(id: string, body: UpdateCategoryProduct): Observable<string> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Observable<CategoryProduct | undefined> {

        const result = CATEGORY_PRODUCTS.find((val) => val.id === id);

        return of(result);
    }
    getPage(filter: PageFilter<CategoryProductFilter>): Observable<PageData<CategoryProduct>> {
        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;

        const filteredProducts = CATEGORY_PRODUCTS.filter((val) => val.category.id === filter.filter.categoryId);

        const data = filteredProducts.slice(start, end)
        const dataSize = filteredProducts.length;

        const pageData: PageData<CategoryProduct> = {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }
        return of(pageData);
    }

    getAllProductsPaginate(filter: PageFilter<AllProductsFilter>): Observable<PageData<CategoryProduct>> {
        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;

        const filteredProducts = CATEGORY_PRODUCTS.filter((val) => val.category.menu.restaurant.id === filter.filter.restaurantId);

        const data = filteredProducts.slice(start, end)
        const dataSize = filteredProducts.length;

        const pageData: PageData<CategoryProduct> = {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }
        return of(pageData);
    }
}