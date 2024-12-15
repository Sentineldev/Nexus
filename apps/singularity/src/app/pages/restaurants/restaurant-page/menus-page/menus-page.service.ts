import { computed, Inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import MenuRepository from "../../interfaces/menu-repository.interface";
import Menu from "../../classes/menu.class";
import { take } from "rxjs";
import RestaurantPageService from "../restaurant-page.service";
import ApiMenuRepository from "../../repositories/menu-api.repository";
import Restaurant from "../../classes/restaurant.class";



type ServiceState = {
    menus: Menu[];
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
            menus: []
        });

    }
    getState() {
        return this.state();
    }
    getMenus() {

        const restaurant = this.restaurantPageService.getRestaurant();
        this.repository.getAll(restaurant.id).pipe(take(1)).subscribe(result => {
            this.restaurantPageService.setLoading(false);
            this.state.set({
                 menus: result
            });
        })
    }
}