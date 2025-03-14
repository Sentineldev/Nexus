import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { PageFilter, PageData } from "../types/pagination";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import CONFIGURATION from "../configuration";
import CategoryProduct from "../classes/category-product.class";
import CategoryProductRepository, { AllProductsFilter, CategoryProductFilter, SaveCategoryProduct, UpdateCategoryProduct } from "../interfaces/category-product.repository";

@Injectable({
    providedIn: "root"
})
export default class ApiCategoryProductRepository implements CategoryProductRepository {
    
    private URL: string;
    constructor(private readonly http: HttpClient) {
        this.URL = `${CONFIGURATION.API_URL}/category-products`;
    }
    save(body: SaveCategoryProduct): Observable<string> {


        const dto = {
            categoryId: body.categoryId,
            count: body.count.toString(),
            price: body.price.toString(),
            productId: body.productId,
        }
        return this.http.post<HttpResponse<unknown>>(this.URL,dto,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El producto ya se encuentra asignado";
                }
                else if (result.status === 422) {
                    err = "Formato de datos incorrecto";
                }
                else if (result.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }
                
                return of(err);
            })
        )
    }

    update(id: string, body: UpdateCategoryProduct): Observable<string> {

        const dto = {
            count: body.count.toString(),
            isActive: body.isActive.toString(),
            price: body.price.toString(),
        };

        return this.http.put<HttpResponse<unknown>>(`${this.URL}/${id}`,dto,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El producto ya se encuentra asignado";
                }
                else if (result.status === 422) {
                    err = "Formato de datos incorrecto";
                }
                else if (result.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }
                
                return of(err);
            })
        )
    }

    delete(id: string): Observable<string> {
        return this.http.delete(`${this.URL}/${id}`)
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 404) {
                    err = "El producto ya fue eliminado";
                }
                else if (result.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }
                
                return of(err);
            })
        )
    }
    getById(id: string): Observable<CategoryProduct | undefined> {
        throw new Error("Method not implemented.");
    }
    getPage(filter: PageFilter<CategoryProductFilter>): Observable<PageData<CategoryProduct>> {
        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });

        return this.http.get<PageData<CategoryProduct>>(`${this.URL}/${filter.filter.categoryId}`, {
            params: params
        });
    }

    getAllProductsPaginate(filter: PageFilter<AllProductsFilter>): Observable<PageData<CategoryProduct>> {
        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize, menuId: filter.filter.menuId, search: filter.filter.search }
        });

        return this.http.get<PageData<CategoryProduct>>(`${this.URL}/all-products/${filter.filter.restaurantId}`, {
            params: params
        });
    }
}