import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import RestaurantPageService2 from "../restaurant/restaurant-page.service";
import MenuRepository from "../restaurants/interfaces/menu-repository.interface";
import ApiMenuRepository from "../../shared/repositories/api/menu-api.repository";
import Menu from "../restaurants/classes/menu.class";


type ServiceState = {
    menu: Menu | undefined;
    loading: boolean;
    hasError: boolean;
};

@Injectable({
    providedIn:"root"
})
export default class MenuPageService2 {

    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository
    ) {


        this.state = signal<ServiceState>({
            hasError: false,
            loading: false,
            menu: undefined,
        });
    }

    getState() {
        return this.state();
    }
    getMenu() {

        const menu = this.state().menu;

        if (menu) {
            return menu;
        }
        throw new Error();
    }


    loadMenu(menuId: string) {

        this.state.update((current) => ({...current, loading: true }));

        this.repository.getById(menuId).subscribe((menu) => {

            setTimeout(() => {
                if (menu) {
                    this.state.update((current) => ({ ...current, menu, hasError: false, loading: false }));
                    return;
                }
                this.state.update((current) => ({ ...current, hasError: true, loading: false }));
            }, 1000);

        })
    }

}