import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import Client from "../classes/client.class";
import ClientRepository, { SaveClient } from "../interfaces/client-repository.interface";
import { PageFilter, PageData } from "../types/pagination";
import { Result } from "../types/result";
import CONFIGURATION from "../../components/configuration";

@Injectable({
    providedIn:"root"
})                              
export default class ApiClientRepository implements ClientRepository {
    
    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = `${CONFIGURATION.API_URL}/clients`;
    }
    save(body: SaveClient): Observable<string> {
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
    update(id: string, body: SaveClient): Observable<string> {
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
    delete(id: string): Observable<string> {
        return this.http.delete(`${this.URL}/${id}`).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {

                let err = "";

                if (error.status === 401) {
                    err = "No tienes permisos para realizar esta accion";
                }
                else if (error.status === 404) {
                    err = "El cliente no existe";
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
    getByIdentification(identification: string): Observable<Result<Client>> {
        return this.http.get<Client>(`${this.URL}/${identification}`).pipe(
            map((result) => ({ body: result, hasError: false, message: "", status: 200 })),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                const response: Result<Client> = {
                    body: {
                        email: "",
                        fullName: "",
                        id: "",
                        identification: "",
                        identificationType: "",
                    },
                    message: "",
                    hasError: true,
                    status: error.status
                };

                if (error.status === 404) {
                    err = "El usuario no existe"
                }
                else if (error.status === 422) {
                    err = "Formato de datos incorrecto"
                }
                else if (error.status === 401) {
                    err = "No tienes autorizacion para realizar esta accion";
                }
                else {
                    err = "Ocurrio un error en el servidor"
                }
                response.message = err;
                return of(response);
            })
        )
    }
    getPage(filter: PageFilter<any>): Observable<PageData<Client>> {

        const params = new HttpParams({
            fromObject: { page: filter.page, pageSize: filter.pageSize }
        });
        return this.http.get<PageData<Client>>(this.URL, {
            params,
        });
    }
    

}