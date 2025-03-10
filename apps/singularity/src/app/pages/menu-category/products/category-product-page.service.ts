import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import { PageData, PageFilter } from "../../../core/types/pagination";
import CategoryProduct from "../../../core/classes/category-product.class";
import CategoryProductRepository, { CategoryProductFilter } from "../../../core/interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../core/api/category-product-api.repository";

type ServiceState = {
    loading: boolean;
    products: PageData<CategoryProduct> | undefined;
    filter: PageFilter<CategoryProductFilter>;
};

@Injectable({
    providedIn: "root"
})
export default class CategoryProductPageService2 {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository
    ) {

        this.state = signal<ServiceState>({
            filter: {
                filter: {
                    categoryId:""
                },
                page: 1,
                pageSize: 5,
            },
            loading: false,
            products: undefined
        });
    }

    getState() {
        return this.state();
    }

    fetch() {
        this.getPage(this.state().filter)
    }

    getPage(filter: PageFilter<CategoryProductFilter>) {

        this.state.update((current) => ({ ...current, loading: true, filter }));
        this.repository.getPage(filter).subscribe((result) => {
            setTimeout(() => {
                this.state.update((current) => ({ ...current, loading: false, products: result }));
            }, 1000);
        })
    }
}