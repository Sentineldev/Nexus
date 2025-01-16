import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProductRepository from "../../interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../../shared/repositories/api/category-product-api.repository";
import RestaurantPageService from "../restaurant-page.service";
import Restaurant from "../../classes/restaurant.class";
import CategoryProduct from "../../classes/category-product.class";
import { combineLatest, zip } from "rxjs";
import ApiMenuRepository from "../../../../shared/repositories/api/menu-api.repository";
import MenuRepository from "../../interfaces/menu-repository.interface";
import Menu from "../../classes/menu.class";
import ApiMenuCategoryRepository from "../../../../shared/repositories/api/menu-category-api.repository";
import MenuCategoryRepository from "../../interfaces/menu-category-repository.interface";
import MenuCategory from "../../classes/menu-category.class";
import { PageFilter } from "../../../../shared/types/pagination";
import { AllProductsFilter } from "../../repositories/category-product.repository";



type ServiceState = {

    products: CategoryProduct[];
    menus: Menu[];
    categories: MenuCategory[];
    filter: PageFilter<AllProductsFilter>;
};
@Injectable({
    providedIn: "root"
})
export default class MakeOrderPageService  {



    private restaurant: Restaurant;

    private state: WritableSignal<ServiceState>;

    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly categoryProducts: CategoryProductRepository,
        @Inject(ApiMenuRepository)
        private readonly menuRepository: MenuRepository,
        private readonly restaurantPageService: RestaurantPageService,
    ) {

        this.restaurant = this.restaurantPageService.getRestaurant();

        this.state = signal<ServiceState>({
            products: [],
            menus: [],
            categories: [],
            filter: {
                page: 1,
                pageSize: 5,
                filter: {
                    restaurantId: this.restaurant.id,
                    menuId: "",
                    search: ""
                }
            }
        })
    }


    getProducts() {

        return this.state().products;
    }

    getState() {
        return this.state();
    }

    getProductsPage(filter: PageFilter<AllProductsFilter>) {
        this.categoryProducts.getAllProductsPaginate(filter).subscribe((result) => {
            this.state.update((current) => ({
                ...current, 
                products: result.data,
                filter,
            }))
        });
    }

    firstLoad() {
        this.restaurantPageService.startLoading("Cargando Productos");
        const products = this.categoryProducts.getAllProductsPaginate({
            page: 1,
            pageSize: 5,
            filter: {
                restaurantId: this.restaurant.id,
                menuId: "",
                search: ""
            }
        });
        const menus = this.menuRepository.getAll(this.restaurant.id);
        
        zip([products, menus]).subscribe(([ productsPage, menus ]) => {
            setTimeout(() => {
                this.restaurantPageService.stopLoading();
                this.state.update((current) => ({
                    ...current,
                    products: productsPage.data,
                    menus: menus,
                }))
            }, 1000);
        });
    }
}