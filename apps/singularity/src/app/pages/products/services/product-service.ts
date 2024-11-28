import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import Product from "../classes/product.class";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { SaveProduct } from "../dto/product.dto";
import LocalProductRepository from "./product.repository";
import ProductRepository from "../interfaces/product-repository.interface";


type ServiceStateProps = {

    products: Product[];
    page: PageData<Product>;
    filter: PageFilter<{}>
    pageLoading: boolean;
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})
export default class ProductService {


    private state: WritableSignal<ServiceStateProps>;


    constructor(    
        @Inject(LocalProductRepository)
        private readonly repository: ProductRepository
    ) {
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
            },
            loading: false,
            pageLoading: false,
        });
        this.getPage(this.state().filter);
    }

    getState() {
        return this.state();
    }

    save(body: SaveProduct) {
        this.state.update((current) => ({ ...current, loading: true }))
        this.repository.save(body).subscribe((result) => {
            if (result === "Created") {
                this.state.update((current) => ({ ...current, loading: false }));
                this.getPage(this.state().filter);
            }
        });
    }   
    getPage(filter: PageFilter<{}>) {
        this.state.update((current) => ({...current, pageLoading: true }));
        this.repository.getPage(filter).subscribe((result) => {
            this.state.update((current) => ({ ...current, page: result, pageLoading: false, filter: filter }));
        });
    }
}