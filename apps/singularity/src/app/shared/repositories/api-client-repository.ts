import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import Client from "../../pages/clients/classes/client.class";
import clientClass from "../../pages/clients/classes/client.class";
import { SaveClient } from "../../pages/clients/dto/client.dto";
import ClientRepository from "../interfaces/client-repository.interface";
import { PageFilter, PageData } from "../types/pagination";
import { Result } from "../types/result";

@Injectable({
    providedIn:"root"
})                              
export default class ApiClientRepository implements ClientRepository {
    
    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = "http://localhost:3000/api/clients";
    }
    Save(body: SaveClient): Observable<string> {
        return this.http.post(this.URL, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {

                let err = "";

                if (error.status === 401) {
        err = "No tienes permisos para realizar esta accion";
                }
                else if(error.status === 409) {
                    err = "El cliente ya fue registrado";
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
    Update(id: string, body: SaveClient): Observable<string> {
        return this.http.put(`${this.URL}/${id}`, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {

                let err = "";

                if (error.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else if(error.status === 409) {
                    err = "El cliente ya fue registrado";
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
    Delete(id: string): Observable<string> {
        throw new Error("Method not implemented.");
    }
    GetByIdentification(identification: string): Observable<Result<Client>> {
        throw new Error("Method not implemented.");
    }
    GetPage(filter: PageFilter<any>): Observable<PageData<Client>> {

        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });
        return this.http.get<PageData<Client>>(this.URL, {
            params,
        });
    }
    

}