import { map, Observable, of, switchMap, tap } from "rxjs";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Product from "../classes/product.class";
import { SaveProduct } from "../dto/product.dto";
import ProductRepository from "../interfaces/product-repository.interface";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export default class LocalProductRepository implements ProductRepository {
    
    
    private products: Product[];

    constructor() {
        this.products = [
            {
                description: "Some description",
                id: "1",
                name: "Some name"
            }
        ];
    }
    update(id: string, body: SaveProduct): Observable<string> {

        const result = this.products.findIndex((val) => val.id === id);

        return of(result).pipe(
            switchMap((result) => {
                if (result === -1) {
                    return "Not found";
                }
                return of(result).pipe(
                    tap((val) => {
                        this.products[val].name = body.name;
                        this.products[val].description = body.description;
                    }),
                    map(() => "Updated")
                )
            })
        )
    }
    delete(id: string): Observable<string> {

        const result = this.products.filter((val) => val.id !== id);
        return of(result).pipe(
            tap(result => { this.products = result; }),
            map(() => "")
        )

    }
    getById(id: string): Observable<Product | undefined> {
        return of(this.products.find((val) => val.id === id));
    }

    save(body: SaveProduct): Observable<string> {

        const id = new Date().getTime().toString();
        const newProduct = new Product(id, body.name, body.description);

        return this.getById(id).pipe(
            switchMap((val) => {
                if (val) {
                    return "Already exists";
                }
                return of(newProduct).pipe(
                    tap(() => this.products.push(newProduct)),
                    map(() => {
                        return "Created";
                    })
                );
            })
        )
    }

    
    getPage(filter: PageFilter<{}>): Observable<PageData<Product>> {
        
        return of({ status: 200 }).pipe(
            map(() => {
                const start = (filter.page - 1) * filter.pageSize;
                const end = start + filter.pageSize;

                const data = this.products.slice(start, end)
                const dataSize = this.products.length;

                const pageData = {
                    data: data,
                    meta: {
                        dataSize: dataSize,
                        page: filter.page,
                        pageSize: filter.pageSize,
                    }
                }
                return pageData;
            })
        )
    }
}