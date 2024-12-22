import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import Product from "../classes/product.class";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { SaveProduct } from "../dto/product.dto";
import ApiProductRepository from "../repositories/product-api.repository";
import ProductRepository from "../../../shared/interfaces/product-repository.interface";

type ServiceStateProps = {

    page: PageData<Product>;
    filter: PageFilter<{}>
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})
export default class ProductService {


    private state: WritableSignal<ServiceStateProps>;


    constructor(    
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository
    ) {
        this.state = signal({
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
        });
    }
    getState() {
        return this.state();
    }

    save(body: SaveProduct) {
        return this.repository.save(body);
    }   


    update(id: string, body: SaveProduct) {
        return this.repository.update(id, body);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }

    getPage(filter: PageFilter<{}>) {
        this.state.update((current) => ({...current, loading: true }));
        this.repository.getPage(filter).subscribe((result) => {
            this.state.update((current) => ({ ...current, page: result, loading: false, filter: filter }));
        });
    }
}