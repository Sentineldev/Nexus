import { Injectable } from "@angular/core";
import AuthRepository from "../../interfaces/auth-repository.interface";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { LogInDto } from "../../dto/auth";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Result } from "../../types/result";
import CONFIGURATION from "../../configuration";

@Injectable({
    providedIn: "root"
})
export default class ApiAuthRepository implements AuthRepository {

    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = `${CONFIGURATION.API_URL}/auth`;
    }
    logIn(body: LogInDto): Observable<Result<string>> {
        return this.http.post<string>(this.URL,body,{ observe: "response" }).pipe(
            map((result) => {
                return {
                    body: result.body!,
                    message: "",
                    status: result.status,
                    hasError: false,
                }

            }),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                const response: Result<string> = {
                    body: "",
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
                return throwError(() => response);
            })
        )
    }



}