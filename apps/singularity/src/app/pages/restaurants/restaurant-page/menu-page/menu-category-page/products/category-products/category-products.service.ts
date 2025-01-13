import { Injectable, WritableSignal, Inject, signal } from "@angular/core";
import { take } from "rxjs";
import { PageData, PageFilter } from "../../../../../../../shared/types/pagination";
import CategoryProduct from "../../../../../classes/category-product.class";
import CategoryProductRepository from "../../../../../interfaces/category-product.repository";
import { CategoryProductFilter } from "../../../../../repositories/category-product.repository";
import ApiCategoryProductRepository from "../../../../../../../shared/repositories/api/category-product-api.repository";


type ServiceStateProps = {
    page: PageData<CategoryProduct>;
    filter: PageFilter<CategoryProductFilter>
    loading: boolean;
}

@Injectable({
    providedIn: "root"
})
export default class CategoryProductsService {


    private state: WritableSignal<ServiceStateProps>;

    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository,
    ) {


        this.state = signal<ServiceStateProps>({
            filter: {
                filter: {
                    categoryId: ""
                },
                page: 1,
                pageSize: 5
            },
            loading: false,
            page: {
                data: [],
                meta: {
                    dataSize: 0,
                    page: 1,
                    pageSize: 5,
                }
            }
        });
    }    


    getState() {
        return this.state();
    }
    refreshPage() {
        // this.state.update((current) => ({...current, page: {  ...current.page, data: [] } }))
        const filter = this.state().filter ;
        this.getPage(filter);
    }
    getPage(filter: PageFilter<CategoryProductFilter>) {
        this.state.update((current) => ({ ...current, loading: true }));
        return this.repository.getPage(filter).pipe(take(1)).subscribe((result) => {
            setTimeout(() => {
                this.state.update((current) => ({ ...current, page: result, loading: false, filter }));
            }, 1000);
        });
    }

}