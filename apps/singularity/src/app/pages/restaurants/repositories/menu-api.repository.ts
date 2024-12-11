import { catchError, map, Observable, of } from "rxjs";
import Menu from "../classes/menu.class";
import { SaveMenu } from "../dto/menu.dto";
import MenuRepository from "../interfaces/menu-repository.interface";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export default class ApiMenuRepository implements MenuRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {
        this.URL = "http://localhost:3000/api/menus";
    }
    save(body: SaveMenu): Observable<string> {

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
    delete(id: string): Observable<string> {
        throw new Error("Method not implemented.");
    }
    update(id: string, body: SaveMenu): Observable<string> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Observable<Menu | undefined> {
        throw new Error("Method not implemented.");
    }
    getAll(restaurantId: string): Observable<Menu[]> {

        return this.http.get<Menu[]>(`${this.URL}/${restaurantId}`)
    }
}