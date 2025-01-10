import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Product from "../classes/product.class";
import { SaveProduct } from "../dto/product.dto";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import ProductRepository from "../../../shared/interfaces/product-repository.interface";

@Injectable({
    providedIn: "root"
})
export default class ApiProductRepository implements ProductRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {

        this.URL = "http://10.80.22.178:3000/api/products";
    }

    save(body: SaveProduct): Observable<string> {

        return this.http.post<HttpResponse<unknown>>(this.URL,body,{ observe: "response" }).pipe(
            map(() => "Created"),
            catchError((response: HttpErrorResponse) => {
                let err = "";

                if (response.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }

                else if (response.status === 409) {
                    err = "El producto ya existe";
                }

                else if (response.status === 422) {
                    err = "Formato de datos incorrecto";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }

                return of(err);
            })
        )
    }
    update(id: string, body: SaveProduct): Observable<string> {

        return this.http.put<HttpResponse<unknown>>(`${this.URL}/${id}`, body, { observe: "response" }).pipe(
            map(() => "Updated"),
            catchError((response: HttpErrorResponse) => {
                let err = "";
                if (response.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }

                else if (response.status === 409) {
                    err = "El producto ya existe";
                }

                else if (response.status === 422) {
                    err = "Formato de datos incorrecto";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }

                return of(err);
            })
        )
    }
    delete(id: string): Observable<string> {
        return this.http.delete<HttpResponse<unknown>>(`${this.URL}/${id}`, { observe: "response" }).pipe(
            map(() => ""),
        )
    }
    getById(id: string): Observable<Product | undefined> {
        throw new Error("Method not implemented.");
    }
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>> {

        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });

        return this.http.get<PageData<Product>>(this.URL, {
            params: params
        });
    }
    
}