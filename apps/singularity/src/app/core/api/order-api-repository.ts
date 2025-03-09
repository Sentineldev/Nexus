import { Injectable } from "@angular/core";
import OrderRepository, { SaveOrder } from "../interfaces/order-repository.interface";
import { catchError, map, Observable, of } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import CONFIGURATION from "../../components/configuration";

@Injectable({
    providedIn: "root"
})
export default class ApiOrderRepository implements OrderRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {
        this.URL = `${CONFIGURATION.API_URL}/orders`;
    }
    save(body: SaveOrder): Observable<string> {
        return this.http.post(this.URL,body,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El nombre del menu debe ser unico";
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
    
}