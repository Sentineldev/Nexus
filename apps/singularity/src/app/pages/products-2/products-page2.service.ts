import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import ProductRepository from "../../shared/interfaces/product-repository.interface";
import ApiProductRepository from "../../shared/repositories/api/product-api.repository";
import { PageData, PageFilter } from "../../shared/types/pagination";
import Product from "../products/classes/product.class";


type ServiceState = {
    loading: boolean;
    products: PageData<Product> | undefined;
    filter: PageFilter<{}>;
};

@Injectable({
    providedIn: "root"
})
export default class ProductsPageService2 {

    private state: WritableSignal<ServiceState>;

    constructor(
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository
    ) {

        this.state = signal<ServiceState>({
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            },
            loading: false,
            products: undefined,
        });
    }


    getState() {
        return this.state();
    }
    fetch() {
        this.getPage(this.state().filter);
    }
    getPage(filter: PageFilter<{}>) {

        this.state.update((current) => ({ ...current, filter, loading: true }));

        this.repository.getPage(filter).subscribe((products) => {

            setTimeout(() => {
                this.state.update((current) => ({ ...current, loading: false, products }))
            }, 1000);
        });
    }
}