import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantRepository from "../../core/interfaces/restaurant-repository.interface";
import ApiRestaurantRepository from "../../core/api/restaurant-api.repository";
import { PageData, PageFilter } from "../../core/types/pagination";
import Restaurant from "../../core/classes/restaurant.class";


type ServiceState = {
    loading: boolean;
    data: PageData<Restaurant> | undefined;
    filter: PageFilter<{}>;
};
@Injectable({
    providedIn: "root"
})
export default class RestaurantsPageService {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository
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

        this.fetch();
    }
    getState() {
        return this.state();
    }


    fetch() {
        this.getPage(this.state().filter);
    }

    getPage(filter: PageFilter<{}>) {


        this.state.update((current) => ({...current, loading: true}));
        this.repository.getPage(filter).subscribe((result) => {
            setTimeout(() => {
                this.state.update((current) => {
                    return { ...current, data: result, loading: false, filter }
                });
            }, 1000);
        });

    }
}