import { Injectable } from "@angular/core";
import EmployeeRepository, { SaveEmployeeDto } from "../interfaces/employee-repository.interface";
import { catchError, map, Observable, of } from "rxjs";
import Employee from "../classes/employee.class";
import { PageFilter, PageData } from "../types/pagination";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import CONFIGURATION from "../../components/configuration";
import FeedStock from "../../pages/product-management/feed-stock/classes/feed-stock.class";

@Injectable({
    providedIn: "root"
})
export default class ApiEmployeeRepository implements EmployeeRepository {

    private URL: string;

    constructor(
        private readonly http: HttpClient
    ) {
        this.URL = `${CONFIGURATION.API_URL}/employee`;
    }

    save(body: SaveEmployeeDto): Observable<string> {
            return this.http.post(this.URL, body).pipe(
                map(() => ""),
                catchError((error: HttpErrorResponse) => {
                    let err = "";
    
                    if (error.status === 401) {
                        err = "No tienes permisos para realizar esta accion";
                    }
                    else if(error.status === 409) {
                        err = "El empleado ya fue registrado";
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
        update(id: string, body: SaveEmployeeDto): Observable<string> {
            return this.http.put(`${this.URL}/${id}`, body).pipe(
                map(() => ""),
                catchError((error: HttpErrorResponse) => {
                    let err = "";
    
                    if (error.status === 401) {
                        err = "No tienes permisos para realizar esta accion";
                    }
                    else if(error.status === 409) {
                        err = "El empleado ya fue registrado";
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
        getPage(filter: PageFilter<unknown>): Observable<PageData<Employee>> {
            const params = new HttpParams({
                fromObject: { page: filter.page, pageSize: filter.pageSize }
            });
            return this.http.get<PageData<Employee>>(`${this.URL}`,{ params })
        }


}