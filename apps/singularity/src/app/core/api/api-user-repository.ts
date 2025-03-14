import { catchError, map, Observable, of } from "rxjs";
import UserRepository, { SaveUserDto, UpdateUserDto, UpdateUserPasswordDto } from "../interfaces/user-repository";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import CONFIGURATION from "../configuration";
import User from "../classes/user.class";


@Injectable({
    providedIn: "root"
})
export default class ApiUserRepository implements UserRepository {


    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = `${CONFIGURATION.API_URL}/users`
    }

    save(body: SaveUserDto): Observable<string> {
        return this.http.post(this.URL, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes autorizacion para realizar esta accion";
                }
                else if (error.status === 422) {
                    err = "Formato de datos incorreto";
                }
                else if (error.status === 409) {
                    err = "El usuario ya existe";
                }
                else if (error.status === 452) {
                    err = "El empleado ya posee un usuario";
                } else {
                    err = "Ocurrio un error en el servidor";
                }
                return of(err);
            }) 
        )
    }
    update(id: string, body: UpdateUserDto): Observable<string> {
        return this.http.put(`${this.URL}/${id}`, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes autorizacion para realizar esta accion";
                }
                else if (error.status === 422) {
                    err = "Formato de datos incorreto";
                }
                else if (error.status === 409) {
                    err = "El usuario ya existe";
                }
                else {
                    err = "Ocurrio un error en el servidor";
                }
                
                return of(err);
            }) 
        )
    }
    changePassword(id: string, body: UpdateUserPasswordDto): Observable<string> {
        return this.http.put(`${this.URL}/change-password/${id}`, body).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes autorizacion para realizar esta accion";
                }
                else if (error.status === 422) {
                    err = "Formato de datos incorreto";
                } else {
                    err = "Ocurrio un error en el servidor";
                }

                return of(err);
            }) 
        )
    }
    delete(id: string): Observable<string> {
        return this.http.delete(`${this.URL}/${id}`).pipe(
            map(() => ""),
            catchError((error: HttpErrorResponse) => {
                let err = "";

                if (error.status === 401) {
                    err = "No tienes autorizacion para realizar esta accion";
                }
                else if (error.status === 422) {
                    err = "Formato de datos incorreto";
                } else {
                    err = "Ocurrio un error en el servidor";
                }

                return of(err);
            }) 
        )
    }
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.URL}`).pipe(
            map((result) => result),
            catchError(() => of([]))
        )
    }




}