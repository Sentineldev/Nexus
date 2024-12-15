import { computed, Inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";
import Menu from "../../classes/menu.class";
import RestaurantPageService from "../restaurant-page.service";
import MenuRepository from "../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../repositories/menu-api.repository";


type ServiceState = {
    menu: Menu | undefined;
};

@Injectable({
    providedIn: "root"
})
export default class MenuPageService {


    private state: WritableSignal<ServiceState>;

    constructor(
        private readonly restaurantPageService: RestaurantPageService,
        @Inject(ApiMenuRepository)
        private readonly menuRepository: MenuRepository,
    ) {
        this.state = signal({
            menu: undefined
        });
    }


    getState() {
        return this.state();
    }

    getMenu(): Menu {

        const menu = this.state().menu;
        if (!menu) {
            throw new Error("Menu not found")
        }   
        return menu;
    }

    getById(menuId: string) {
        this.menuRepository.getById(menuId).subscribe((result) => {
            this.restaurantPageService.setLoading(false);
            if (result) {
                this.state.set({
                    menu: result
                });
            }

        })
    }

}