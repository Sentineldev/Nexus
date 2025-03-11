import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import ProductRepository from "../../../core/interfaces/product-repository.interface";
import ApiProductRepository from "../../../core/api/product-api.repository";
import { PageData, PageFilter } from "../../../core/types/pagination";
import Product from "../../../core/classes/product.class";


type ServiceState = {
    loading: boolean;
    products: PageData<Product> | undefined;
    filter: PageFilter<{}>;
    groups: string[];
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
            groups: [],
        });
    }


    getState() {
        return this.state();
    }

    groups(): string[] {
        return this.state().groups;
    }

    fetch() {
        this.getPage(this.state().filter);
        this.getGroups();
    }

    getGroups() {
        this.repository.getGroups().subscribe((groups) => {
            setTimeout(() => {
                this.state.update((current) => ({ ...current, groups }));
            }, 1000);
        })
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