import { computed, Inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import MenuRepository from "../../interfaces/menu-repository.interface";
import Menu from "../../classes/menu.class";
import { take } from "rxjs";
import RestaurantPageService from "../restaurant-page.service";
import ApiMenuRepository from "../../repositories/menu-api.repository";
import Restaurant from "../../classes/restaurant.class";



type ServiceState = {
    menus: Menu[];
    loading: boolean;
}

@Injectable({
    providedIn: "root"
})
export default class MenusPageService {

    private state: WritableSignal<ServiceState>;

    
    constructor(
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository,
        private readonly restaurantPageService: RestaurantPageService
    ) {

        this.state = signal({
            menus: [],
            loading: false,
        });

    }
    getState() {
        return this.state();
    }

    clear() {
        this.state.update((current) => ({...current, menus: []}))
    }

    refreshMenus() {
        this.getMenus();
    }
    getMenus() {

        this.clear();
        if (this.restaurantPageService.isLoading()) {
            this.restaurantPageService.startLoading("Cargando menus");
        }
        if (!this.restaurantPageService.isLoading()) {
            this.state.update((current) => ({...current, loading: true }));
        }

        const restaurant = this.restaurantPageService.getRestaurant();
        this.repository.getAll(restaurant.id).pipe(take(1)).subscribe(result => {
            setTimeout(() => {
                this.restaurantPageService.stopLoading();
                this.state.set({
                    menus: result,
                    loading: false,
                });
            }, 1000);
        })
    }
}