import { Injectable } from "@angular/core";
import FeedStockRepository, { SaveFeedStockDto } from "../interfaces/feed-stock-repository.interface";
import { catchError, map, Observable, of } from "rxjs";
import { PageFilter, PageData } from "../types/pagination";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import CONFIGURATION from "../configuration";
import FeedStock from "../../pages/product-management/feed-stock/classes/feed-stock.class";

@Injectable({
    providedIn: 'root'
})
export default class ApiFeedStockRepository implements FeedStockRepository {

    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = `${CONFIGURATION.API_URL}/feed-stock`;
    }
    save(body: SaveFeedStockDto): Observable<string> {
        return this.http.post(this.URL, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else if(error.status === 409) {
                    err = "El ingrediente ya fue registrado";
                }
                else if (error.status === 422) {
                    err = "Formato de datos invalido";
                }
                else {
                    err = "Ocurrio un error en el servidor"
                }
                
                return of(err)
            })
        )
    }
    update(id: string, body: SaveFeedStockDto): Observable<string> {
        return this.http.put(`${this.URL}/${id}`, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else if(error.status === 409) {
                    err = "El ingrediente ya fue registrado";
                }
                else if (error.status === 422) {
                    err = "Formato de datos invalido";
                }
                else {
                    err = "Ocurrio un error en el servidor"
                }
                return of(err)
            })
        )
    }
    delete(id: string): Observable<string> {
        return this.http.delete(`${this.URL}/${id}`).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else if (error.status === 422) {
                    err = "Formato de datos invalido";
                }
                else {
                    err = "Ocurrio un error en el servidor"
                }
                return of(err)
            })
        )
    }
    getPage(filter: PageFilter<unknown>): Observable<PageData<FeedStock>> {
        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });
        return this.http.get<PageData<FeedStock>>(`${this.URL}`,{ params })
    }
}