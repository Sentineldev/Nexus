import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import MenuCategory from "../../../classes/menu-category.class";
import MenuCategoryRepository from "../../../interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../repositories/menu-category-api.repository";
import RestaurantPageService from "../../restaurant-page.service";


type ServiceState = {
    categories: MenuCategory[];
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
            categories: []
        })
    }


    getState() {
        return this.state();
    }


    getAll(menuId: string) {

        if (!this.restaurantPageService.isLoading()) {
            this.restaurantPageService.setLoading(true);
        }
        this.repository.getAll(menuId).subscribe((result) => {
            setTimeout(() => {
                this.restaurantPageService.setLoading(false);
                this.state.set({
                    categories: result
                });
            }, 1000);
        });
    }
}