import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import MenuCategory from "../../../classes/menu-category.class";
import MenuCategoryRepository from "../../../interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../repositories/menu-category-api.repository";
import RestaurantPageService from "../../restaurant-page.service";


type ServiceState = {
    categories: MenuCategory[];
    loading: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class CategoriesPageService {


    private state: WritableSignal<ServiceState>;

    constructor(
        private readonly restaurantPageService: RestaurantPageService,
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {

        this.state = signal({
            categories: [],
            loading: false,
        })
    }


    getState() {
        return this.state();
    }

    clear() {
        this.state.update((current) => ({...current, categories: []}))
    }
    getAll(menuId: string) {
        this.clear();
        if (this.restaurantPageService.isLoading()) {
            this.restaurantPageService.startLoading("Cargando categorias");
        }
        if (!this.restaurantPageService.isLoading()) {
            this.state.update((current) => ({...current, loading: true }));
        }
        this.repository.getAll(menuId).subscribe((result) => {
            setTimeout(() => {
                this.restaurantPageService.stopLoading();
                this.state.update((current) => ({...current, categories: result, loading: false }));
            }, 1000);
        });
    }
}