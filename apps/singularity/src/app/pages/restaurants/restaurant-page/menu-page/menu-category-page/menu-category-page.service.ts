import { Injectable, WritableSignal, Inject, signal } from "@angular/core";
import MenuCategory from "../../../classes/menu-category.class";
import ApiMenuCategoryRepository from "../../../repositories/menu-category-api.repository";
import RestaurantPageService from "../../restaurant-page.service";
import MenuCategoryRepository from "../../../interfaces/menu-category-repository.interface";


type ServiceState = {
    category: MenuCategory | undefined;
};

@Injectable({
    providedIn: 'root'
})
export default class MenuCategoryPageService {

    private state: WritableSignal<ServiceState>;

    constructor(
        private readonly restaurantPageService: RestaurantPageService,
        @Inject(ApiMenuCategoryRepository)
        private readonly MenuCategoryRepository: MenuCategoryRepository,
    ) {

        this.state = signal({
            category:  undefined
        })
    }


    getState() {
        return this.state();
    }

    getCategory(): MenuCategory {

        const category = this.state().category
        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    }

    getById(categoryId: string) {
        this.restaurantPageService.startLoading("Cargando categoria");
        this.MenuCategoryRepository.getById(categoryId).subscribe((result) => {
            setTimeout(() => {
                this.restaurantPageService.stopLoading();
                if (result) {
                    this.state.set({ category: result });
                }
            }, 1000);
        })
    }


}