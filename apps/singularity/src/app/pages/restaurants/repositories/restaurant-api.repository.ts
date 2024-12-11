import { Injectable } from "@angular/core";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";
import { catchError, map, Observable, of } from "rxjs";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Restaurant from "../classes/restaurant.class";
import { SaveRestaurant } from "../dto/restaurant.dto";
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export default class ApiRestaurantRepository implements RestaurantRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {

        this.URL = "http://localhost:3000/api/restaurants";
    }


    save(body: SaveRestaurant): Observable<string> {
        return this.http.post<HttpResponse<unknown>>(this.URL,body,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El nombre del restaurant debe ser unico";
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
    getById(id: string): Observable<Restaurant | undefined> {
        return this.http.get<Restaurant>(`${this.URL}/${id}`).pipe(
            map((result) => result),
            catchError(() => of(undefined))
        )
    }
    getPage(filter: PageFilter<{}>): Observable<PageData<Restaurant>> {
        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });

        return this.http.get<PageData<Restaurant>>(this.URL, {
            params: params
        });
    }
}