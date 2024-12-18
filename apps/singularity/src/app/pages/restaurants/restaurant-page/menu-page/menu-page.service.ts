import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import Menu from "../../classes/menu.class";
import MenuRepository from "../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../repositories/menu-api.repository";
import RestaurantPageService from "../restaurant-page.service";


type ServiceState = {
    menu: Menu | undefined;
};

@Injectable({
    providedIn: "root"
})
export default class MenuPageService {


    private state: WritableSignal<ServiceState>;

    constructor(
        @Inject(ApiMenuRepository)
        private readonly menuRepository: MenuRepository,
        private readonly restaurantPageService: RestaurantPageService,
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

    clear() {
        this.state.update((current) => ({...current, menu: undefined}));
    }

    getById(menuId: string) {
        this.clear();

        if (this.restaurantPageService.isLoading()) {
            this.restaurantPageService.startLoading("Cargando menu");
        }
        if (!this.restaurantPageService.isLoading()) {
            this.restaurantPageService.startLoading("Cargando menu");
        }
        this.menuRepository.getById(menuId).subscribe((result) => {
           setTimeout(() => {
             if (result) {
                 this.state.set({
                     menu: result
                 });
             }
           }, 1000);

        })
    }

}