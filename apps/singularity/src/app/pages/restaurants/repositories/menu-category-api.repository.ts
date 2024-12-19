import { Injectable } from "@angular/core";
import MenuCategoryRepository from "../interfaces/menu-category-repository.interface";
import { catchError, map, Observable, of } from "rxjs";
import MenuCategory from "../classes/menu-category.class";
import { SaveMenuCategory, UpdateMenuCategory } from "../dto/menu-category.dto";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export default class ApiMenuCategoryRepository implements MenuCategoryRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {
        this.URL = "http://localhost:3000/api/menu-categories";
    }
  

    save(body: SaveMenuCategory): Observable<string> {
        return this.http.post<HttpResponse<unknown>>(this.URL,body,{ observe: "response" })
        .pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = "";
                if (result.status === 409) {
                    err = "El nombre de la categoria debe ser unico";
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
    update(id: string, body: UpdateMenuCategory): Observable<string> {

        return this.http.put(`${this.URL}/${id}`, body).pipe(
            map(() => ""),
            catchError((result: HttpErrorResponse) => {
                let err = '';

                if (result.status === 409) {
                    err = "El nombre de la categoria debe ser unico";
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
    getById(id: string): Observable<MenuCategory | undefined> {
        return this.http.get<MenuCategory>(`${this.URL}/by-id/${id}`).pipe(
            map((result) => result),
            catchError(() => of(undefined))
        )
    }

    getAll(menuId: string): Observable<MenuCategory[]> {
        return this.http.get<MenuCategory[]>(`${this.URL}/all/${menuId}`).pipe(
            map((result) => result),
            catchError(() => of([]))
        )
    }
} 