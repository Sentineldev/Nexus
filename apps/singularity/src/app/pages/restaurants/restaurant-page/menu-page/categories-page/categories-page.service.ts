import { computed, Inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import MenuCategory from "../../../classes/menu-category.class";
import MenuCategoryRepository from "../../../interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../repositories/menu-category-api.repository";
import RestaurantPageService from "../../restaurant-page.service";
import Menu from "../../../classes/menu.class";
import MenuPageService from "../menu-page.service";


type ServiceState = {
    categories: MenuCategory[];
    loading: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class CategoriesPageService {


    private state: WritableSignal<ServiceState>;
    private menu: Signal<Menu>;

    constructor(
        private readonly restaurantPageService: RestaurantPageService,
        private readonly menuPageService: MenuPageService,
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {

        this.menu = computed(() => this.menuPageService.getMenu());
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

    refreshCategories() {
        this.getAll();
    }
    getAll() {
        this.clear();
        if (this.restaurantPageService.isLoading()) {
            this.restaurantPageService.startLoading("Cargando categorias");
        }
        if (!this.restaurantPageService.isLoading()) {
            this.state.update((current) => ({...current, loading: true }));
        }
        this.repository.getAll(this.menu().id).subscribe((result) => {
            setTimeout(() => {
                this.restaurantPageService.stopLoading();
                this.state.update((current) => ({...current, categories: result, loading: false }));
            }, 1000);
        });
    }
}