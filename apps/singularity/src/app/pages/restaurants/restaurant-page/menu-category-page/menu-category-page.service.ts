import { Inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import MenuCategory from "../../classes/menu-category.class";
import MenuCategoryRepository from "../../interfaces/menu-category-repository.interface";
import { take } from "rxjs";
import ApiMenuCategoryRepository from "../../repositories/menu-category-api.repository";
import RestaurantPageService from "../restaurant-page.service";

type ServiceState = {
    category: MenuCategory | undefined;
};

@Injectable({
    providedIn: 'root'
})
export default class CategoriesPageService {

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
        
        this.MenuCategoryRepository.getById(categoryId).subscribe((result) => {
            this.restaurantPageService.setLoading(false);
            if (result) {
                this.state.set({ category: result });
            }
        })
    }


}