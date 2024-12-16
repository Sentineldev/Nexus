import { Injectable } from "@angular/core";
import CategoryProductRepository from "../interfaces/category-product.repository";
import { catchError, map, Observable, of } from "rxjs";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import CategoryProduct from "../classes/category-product.class";
import { SaveCategoryProduct } from "../dto/category-product.dto";
import { CategoryProductFilter } from "./category-product.repository";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export default class ApiCategoryProductRepository implements CategoryProductRepository {
    
    private URL: string;
    constructor(private readonly http: HttpClient) {
        this.URL = "http://localhost:3000/api/category-products";
    }
    save(body: SaveCategoryProduct): Observable<string> {
        return this.http.post<HttpResponse<unknown>>(this.URL,body,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El producto ya se encuentra asignado";
                }
                else if (result.status === 422) {
                    err = "No puedes dejar el nombre vacio";
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
        throw new Error("Method not implemented.");
    }
    update(id: string, body: SaveCategoryProduct): Observable<string> {
        throw new Error("Method not implemented.");
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
}