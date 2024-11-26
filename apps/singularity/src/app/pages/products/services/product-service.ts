import { Injectable, signal, WritableSignal } from "@angular/core";
import Product from "../classes/product.class";
import { of } from "rxjs";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { SaveProduct } from "../dto/product.dto";


type ServiceStateProps = {

    products: Product[];
    page: PageData<Product>;
    filter: PageFilter<{}>
}

@Injectable({
    providedIn: 'root'
})
export default class ProductService {


    private state: WritableSignal<ServiceStateProps>;


    constructor() {
        this.state = signal({
            products: [],
            page: {
                data: [],
                meta: {
                    dataSize: 0,
                    page: 1,
                    pageSize: 5,
                },
            },
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            }
        });
    }

    getState() {
        return this.state();
    }

    save(body: SaveProduct) {
        const id = new Date().getTime().toString();
        const newProduct = new Product(id, body.name, body.description);
        const exists = this.state().products.find((val) => val.id === id);
        if (exists) {
            throw new Error("");
        }

        this.state.update((current) => ({...current, products: [...current.products, newProduct]}));
        this.getPage(this.state().filter);
    }   
    getPage(filter: PageFilter<{}>) {
        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;

        const data = this.state().products.slice(start, end)
        const dataSize = this.state().products.length;

        const pageData = {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }

        of(pageData).subscribe((result) => {
            this.state.update((current): ServiceStateProps => {
                return { ...current, page: result, filter: filter };
            })
        });
    }
}