import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import FeedStock from "./classes/feed-stock.class";
import FeedStockRepository from "../../../core/interfaces/feed-stock-repository.interface";
import ApiFeedStockRepository from "../../../core/api/api-feed-stock-repository";
import { PageFilter, PageData } from "../../../core/types/pagination";


type ServiceState = {
    loading: boolean;
    filter: PageFilter<unknown>
    data: PageData<FeedStock> | undefined
};
@Injectable({
    providedIn: 'root'
})
export default class FeedStockPageService {


    private state: WritableSignal<ServiceState>
    constructor(
        @Inject(ApiFeedStockRepository)
        private readonly repository: FeedStockRepository
    ) {
        this.state = signal<ServiceState>({
            data: undefined,
            loading: false,
            filter: {
                page: 1,
                pageSize: 5,
                filter: {}
            }
        });

        this.refresh();
    }



    getState() {
        return this.state();
    }

    refresh() {
        this.getPage(this.state().filter)
    }


    getPage(filter: PageFilter<unknown>) {

        this.state.update((current) => ({ ...current, loading: true }));

        this.repository.getPage(filter).subscribe((data) => {
            setTimeout(() => {
                this.state.update((current) => ({ ...current, loading: false, data, filter }));
            }, 1000);
        })
    }
}