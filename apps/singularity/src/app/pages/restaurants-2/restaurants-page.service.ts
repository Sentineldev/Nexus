import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantRepository from "../restaurants/interfaces/restaurant-repository.interface";
import ApiRestaurantRepository from "../../shared/repositories/api/restaurant-api.repository";
import { PageData, PageFilter } from "../../shared/types/pagination";
import Restaurant from "../restaurants/classes/restaurant.class";


type ServiceState = {
    loading: boolean;
    data: PageData<Restaurant> | undefined;
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
            loading: false
        });

        this.getPage({
            filter: {},
            page: 1,
            pageSize: 5
        });
    }
    getState() {
        return this.state();
    }


    getPage(filter: PageFilter<{}>) {


        this.state.update((current) => ({...current, loading: true}));
        this.repository.getPage(filter).subscribe((result) => {
            setTimeout(() => {
                this.state.update((current) => {
                    return { ...current, data: result, loading: false }
                });
            }, 1000);
        });

    }
}