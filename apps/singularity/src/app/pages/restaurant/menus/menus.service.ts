import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import Menu from "../../restaurants/classes/menu.class";
import MenuRepository from "../../restaurants/interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../shared/repositories/api/menu-api.repository";
import RestaurantPage2 from "../restaurant.page";
import RestaurantPageService2 from "../restaurant-page.service";

type ServiceState = {
    menus: Menu[];
    loading: boolean;
    restaurantId: string;
};

@Injectable({
    providedIn: "root"
})
export default class MenusService  {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository,
    ) {


        this.state = signal<ServiceState>({
            loading: false,
            menus: [],
            restaurantId: "",
        });
    }

    getState() {
        return this.state();
    }
    fetch() {
        this.getMenus(this.state().restaurantId);
    }

    getMenus(restaurantId: string) {

        this.state.update((current) => ({...current, loading: true, restaurantId }));

        this.repository.getAll(restaurantId).subscribe((menus) => {
            setTimeout(() => {
                this.state.update((current) => {
                    return{ ...current, loading: false, menus }
                });
            }, 1000);
        })
    }
}