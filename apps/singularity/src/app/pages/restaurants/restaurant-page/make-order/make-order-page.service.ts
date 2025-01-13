import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProductRepository from "../../interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../../shared/repositories/api/category-product-api.repository";
import RestaurantPageService from "../restaurant-page.service";
import Restaurant from "../../classes/restaurant.class";
import CategoryProduct from "../../classes/category-product.class";


type ServiceState = {

    products: CategoryProduct[];
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
        private readonly restaurantPageService: RestaurantPageService,
    ) {

        this.restaurant = this.restaurantPageService.getRestaurant();

        this.state = signal<ServiceState>({
            products: [],
        })
    }


    getProducts() {

        return this.state().products;
    }


    firstLoad() {
        this.restaurantPageService.startLoading("Cargando Productos");
        this.categoryProducts.getAllProductsPaginate({
            page: 1,
            pageSize: 5,
            filter: {
                restaurantId: this.restaurant.id,
            }
        }).subscribe((result) => {
            setTimeout(() => {

                this.state.update((current) => ({...current, products: result.data }))
                this.restaurantPageService.stopLoading();
            }, 1000);
        });
    }
}