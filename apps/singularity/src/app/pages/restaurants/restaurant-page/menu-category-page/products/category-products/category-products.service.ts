import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProductRepository from "../../../../interfaces/category-product.repository";
import LocalCategoryProductRepository, { CategoryProductFilter } from "../../../../repositories/category-product.repository";
import CategoryProduct from "../../../../classes/category-product.class";
import { PageData, PageFilter } from "../../../../../../shared/types/pagination";
import { SaveCategoryProduct } from "../../../../dto/category-product.dto";
import { take } from "rxjs";
import ApiCategoryProductRepository from "../../../../repositories/category-product-api.repository";

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


    save(body: SaveCategoryProduct) {
        return this.repository.save(body);
    }
    getPage(filter: PageFilter<CategoryProductFilter>) {
        this.state.update((current) => ({ ...current, loading: true }));
        return this.repository.getPage(filter).pipe(take(1)).subscribe((result) => {
            this.state.update((current) => ({ ...current, page: result, loading: false, filter }));
        });
    }

}