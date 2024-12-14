import { computed, Inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";
import MenuCategory from "../../classes/menu-category.class";
import RestaurantPageService from "../restaurant-page.service";
import LocalMenuCategoryRepository from "../../repositories/menu-category.repository";
import MenuCategoryRepository from "../../interfaces/menu-category-repository.interface";
import { take } from "rxjs";
import Menu from "../../classes/menu.class";
import ApiMenuCategoryRepository from "../../repositories/menu-category-api.repository";

type ServiceState = {
    restaurant: Restaurant;
    category: MenuCategory;
    loading: boolean;
    errorMessage: string;
};

type ServiceLoadingState = {
    loading: boolean;
    error: string;
};

@Injectable({
    providedIn: 'root'
})
export default class MenuCategoryPageService {

    private state: Signal<ServiceState>;
    private loadingState: WritableSignal<ServiceLoadingState>;

    private categorySignal: WritableSignal<MenuCategory>;
    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly MenuCategoryRepository: MenuCategoryRepository,
        private readonly restaurantPageService: RestaurantPageService,
    ) {

        const aux = this.restaurantPageService.getState();
        const menu = new Menu({
            categories: [],
            id: "",
            name: "",
            restaurant: aux.restaurant!
        });
        const category = new MenuCategory({
            id: "",
            name: "",
            menu,
        });
        this.loadingState = signal<ServiceLoadingState>({
            error: "",
            loading: false,
        })
        this.categorySignal = signal<MenuCategory>(category);

        
        this.state = computed(() => {
            const restaurant = this.restaurantPageService.getRestaurant()!;
            const category = this.categorySignal();
            return {
                restaurant,
                category,
                loading: this.loadingState().loading,
                errorMessage: this.loadingState().error
            }
        });
    }


    getState() {
        return this.state();
    }

    getCategory() {
        return this.state().category;
    }

    getById(categoryId: string) {

        this.loadingState.update((current) => ({...current, loading: true }));

        this.MenuCategoryRepository.getById(categoryId).pipe(take(1)).subscribe((category) => {
            this.loadingState.update((current) => ({...current, loading: false }));

            if (!category) {
                this.loadingState.update((current) => ({ ...current, error: "Data failed to fetch"}));
                return;
            }
            this.categorySignal.set(category);
        })
    }


}