import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";
import LocalRestaurantRepository from "../repositories/restaurant.repository";
import Restaurant from "../classes/restaurant.class";
import { take } from "rxjs";
import ApiRestaurantRepository from "../repositories/restaurant-api.repository";


export type RestaurantPageState = {
    restaurant: Restaurant | undefined;
    loading: boolean;
    loadingLabel: string;
    errorMessage: string;
}

@Injectable({
    providedIn: "root"
})
export default class RestaurantPageService {


    private state: WritableSignal<RestaurantPageState>;
    constructor(
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository,
    ) {

        this.state = signal<RestaurantPageState>({
            errorMessage: "",
            loading: false,
            loadingLabel: "",
            restaurant: undefined
        });
    }


    
    getRestaurant(): Restaurant {

        const restaurant = this.state().restaurant
        if (!restaurant) {
            throw new Error("Restaurant not loaded");
        }
        return restaurant;
    }
    getState() {
        return this.state();
    }

    startLoading(loadingLabel: string) {
        this.state.update((current) => ({...current, loadingLabel, loading: true }));
    }
    stopLoading() {
        this.state.update((current) => ({...current, loadingLabel: "", loading: false }))
    }

    isLoading() {
        return this.state().loading;
    }


    clear() {
        this.state.update((current) => ({...current, restaurant: undefined}));
    }

    getById(restaurantId: string) {
        this.clear();

        this.startLoading("Cargando restaurante");
        this.repository.getById(restaurantId).pipe(take(1)).subscribe((result) => {
            setTimeout(() => {
                if (!result) {
                    this.state.update((current) => ({ ...current, errorMessage: "Not found" }));
                    return;
                }
    
                this.state.update((current) => ({ ...current, restaurant: result }));
            }, 100);
        })
    }


}