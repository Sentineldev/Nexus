import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";
import LocalRestaurantRepository from "../repositories/restaurant.repository";
import Restaurant from "../classes/restaurant.class";
import { take } from "rxjs";


type ServiceState = {
    restaurant: Restaurant;
    loading: boolean;
    errorMessage: string;
}

@Injectable({
    providedIn: "root"
})
export default class RestaurantPageService {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(LocalRestaurantRepository)
        private readonly repository: RestaurantRepository,
    ) {

        this.state = signal<ServiceState>({
            errorMessage: "",
            loading: false,
            restaurant: {
                id: "",
                name: ""
            }
        });
    }


    
    getRestaurant() {
        return this.state().restaurant;
    }
    getState() {
        return this.state();
    }


    getById(restaurantId: string) {


        this.state.update((current) => ({ ...current, loading: true }));
        this.repository.getById(restaurantId).pipe(take(1)).subscribe((result) => {
            this.state.update((current) => ({ ...current, loading: false }));

            console.log(result);
            if (!result) {
                this.state.update((current) => ({ ...current, errorMessage: "Not found" }));
                return;
            }
            this.state.update((current) => ({ ...current, restaurant: result }));
        })
    }


}