import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProductRepository, { AllProductsFilter } from "../../core/interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../core/api/category-product-api.repository";
import Restaurant from "../../core/classes/restaurant.class";
import CategoryProduct from "../../core/classes/category-product.class";
import { zip } from "rxjs";
import ApiMenuRepository from "../../core/api/menu-api.repository";
import MenuRepository from "../../core/interfaces/menu-repository.interface";
import Menu from "../../core/classes/menu.class";
import MenuCategory from "../../core/classes/menu-category.class";
import { PageFilter } from "../../core/types/pagination";
import RestaurantPageService2 from "../restaurant/restaurant-page.service";



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
        private readonly restaurantPageService: RestaurantPageService2,
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
                    restaurantId: "",
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

        const filter = {
            page: 1,
            pageSize: 5,
            filter: {
                restaurantId: this.restaurant.id,
                menuId: "",
                search: ""
            }
        };
        this.state.update((current) => ({ ...current, filter }))
        const products = this.categoryProducts.getAllProductsPaginate(filter);
        const menus = this.menuRepository.getAll(this.restaurant.id);
        
        zip([products, menus]).subscribe(([ productsPage, menus ]) => {
            setTimeout(() => {
                this.state.update((current) => ({
                    ...current,
                    products: productsPage.data,
                    menus: menus,
                }))
            }, 1000);
        });
    }
}