import { Injectable } from "@angular/core";
import ProductRepository from "../interfaces/product-repository.interface";
import { map, Observable, switchMap } from "rxjs";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Product from "../classes/product.class";
import { SaveProduct } from "../dto/product.dto";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export default class ApiProductRepository implements ProductRepository {

    private URL: string;
    constructor(private readonly http: HttpClient) {

        this.URL = "http://localhost:3000/api/products";
    }

    save(body: SaveProduct): Observable<string> {

        return this.http.post<HttpResponse<unknown>>(this.URL,body,{ observe: "response" }).pipe(
            map(result => {
                if (result.status === 201) {
                    return "Created";
                }
                return "Not created";
            })
        )
    }
    update(id: string, body: SaveProduct): Observable<string> {

        return this.http.put<HttpResponse<unknown>>(`${this.URL}/${id}`, body, { observe: "response" }).pipe(
            map(result => {
                if (result.status === 200) {
                    return "Updated"
                }
                return "Not Updated";
            }) 
        )
    }
    delete(id: string): Observable<string> {
        return this.http.delete<HttpResponse<unknown>>(`${this.URL}/${id}`, { observe: "response" }).pipe(
            map(result => {
                if (result.status === 200) {
                    return ""
                }
                return "Not deleted";
            }) 
        )
    }
    getById(id: string): Observable<Product | undefined> {
        throw new Error("Method not implemented.");
    }
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>> {
        return this.http.get<PageData<Product>>(this.URL);
    }
    
}