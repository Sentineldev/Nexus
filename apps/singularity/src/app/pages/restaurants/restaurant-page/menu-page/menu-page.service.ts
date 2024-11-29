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



type ServiceState = {
    restaurant: Restaurant
    menu: Menu[];
}

@Injectable({
    providedIn: "root"
})
export default class MenuPageService {

    private state: Signal<ServiceState>;

    private menuSignal: WritableSignal<Menu[]>;

    
    constructor(
        @Inject(LocalMenuRepository)
        private readonly repository: MenuRepository,
        @Inject(LocalMenuCategoryRepository)
        private readonly categoryRepository: MenuCategoryRepository,
        private readonly restaurantPageService: RestaurantPageService
    ) {

        this.menuSignal = signal<Menu[]>([]);
        this.state = computed(() => {
            return {
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
        this.repository.getAll(this.state().restaurant.id).pipe(take(1)).subscribe(result => {
            this.menuSignal.set(result);
        })
    }
}