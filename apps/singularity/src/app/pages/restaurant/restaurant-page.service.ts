import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantRepository from "../../core/interfaces/restaurant-repository.interface";
import ApiRestaurantRepository from "../../core/api/restaurant-api.repository";
import Restaurant from "../../core/classes/restaurant.class";


type ServiceState = {
    loading: boolean;
    restaurant: Restaurant | undefined;
    hasError: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class RestaurantPageService2 {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository
    ) {
        this.state = signal<ServiceState>({
            restaurant: undefined,
            loading: true,
            hasError: false,
        });
    }


    getState() {
        return this.state();
    }
    getRestaurant() {

        const restaurant =  this.state().restaurant;

        if (restaurant) {
            return restaurant;
        }
        throw new Error(); 
    }
    loadRestaurant(id: string) {
        this.state.update((current) => ({...current, loading: true}));
        this.repository.getById(id).subscribe((restaurant) => {
            setTimeout(() => {
                if (restaurant) {
                    this.state.update((current) => ({...current, restaurant, loading: false, hasError: false }));
                    return;
                }
                this.state.update((current) => ({ ...current, loading: false, hasError: true, restaurant: undefined }));
            }, 1000);
        })
    }

}