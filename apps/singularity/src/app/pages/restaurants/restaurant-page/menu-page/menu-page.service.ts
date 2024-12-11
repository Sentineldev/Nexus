import { computed, Inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import MenuRepository from "../../interfaces/menu-repository.interface";
import LocalMenuRepository from "../../repositories/menu.repository";
import Menu from "../../classes/menu.class";
import { SaveMenu } from "../../dto/menu.dto";
import { take } from "rxjs";
import { SaveMenuCategory } from "../../dto/menu-category.dto";
import MenuCategoryRepository from "../../interfaces/menu-category-repository.interface";
import LocalMenuCategoryRepository from "../../repositories/menu-category.repository";
import Restaurant from "../../classes/restaurant.class";
import RestaurantPageService from "../restaurant-page.service";
import ApiMenuRepository from "../../repositories/menu-api.repository";
import ApiMenuCategoryRepository from "../../repositories/menu-category-api.repository";



type ServiceState = {
    restaurant: Restaurant
    menu: Menu[];
    loading: boolean;
}

@Injectable({
    providedIn: "root"
})
export default class MenuPageService {

    private state: Signal<ServiceState>;

    private menuSignal: WritableSignal<Menu[]>;
    private loadingSignal: WritableSignal<boolean>;

    
    constructor(
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository,
        @Inject(ApiMenuCategoryRepository)
        private readonly categoryRepository: MenuCategoryRepository,
        private readonly restaurantPageService: RestaurantPageService
    ) {

        this.menuSignal = signal<Menu[]>([]);
        this.loadingSignal = signal<boolean>(false);
        this.state = computed(() => {
            return {
                loading: this.loadingSignal(),
                menu: this.menuSignal(),
                restaurant: this.restaurantPageService.getRestaurant()
            }
        })

    }

    getState() {
        return this.state();
    }
    save(body: SaveMenu) {
        this.repository.save(body).pipe(take(1)).subscribe(() => {
            this.getMenu();
        })
    }

    addCategory(body: SaveMenuCategory) {
        this.categoryRepository.save(body).pipe(take(1)).subscribe(() => {
            this.getMenu();
        })
    }


    getMenu() {
        this.loadingSignal.set(true);
        this.repository.getAll(this.state().restaurant.id).pipe(take(1)).subscribe(result => {
            this.loadingSignal.set(false);
            this.menuSignal.set(result);
        })
    }
}