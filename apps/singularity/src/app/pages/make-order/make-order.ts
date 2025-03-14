import { Component, computed, OnInit } from "@angular/core";
import ProductsContainer from "./products-container";
import MakeOrderPageService from "./make-order-page.service";
import OrderItemsContainer from "./order-items-container";
import OptionsContainer from "./options-container";
import OrderService from "./order-service";
import RestaurantPageService2 from "../restaurant/restaurant-page.service";
import AuthService from "../main/auth.service";

@Component({
    selector: `app-make-order-page`,
    imports: [ProductsContainer, OrderItemsContainer, OptionsContainer],

    styles: `

    .main-container {
        display: grid;
        grid-template-columns: 0.7fr 2fr auto;
    }
    `,
    template: `
    <div class="h-screen flex flex-col overflow-auto">
        <div class="flex items-center lg:border-b p-4 py-2">
            <div class="flex items-center gap-2 flex-1">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6L5 12L11 18M18 6L12 12L18 18" stroke="#FF4E15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <a [href]="restaurantUrl()" class="font-bold text-primary text-3xl py-2">{{restaurant().name}}</a>
            </div>
            <div class="flex items-center gap-2">
                <img src="/svg/user-svgrepo-com.svg" alt="user icon" width="28" height="28">
                <p>{{user().shortName}}</p>
            </div>
        </div>
        <div class=" main-container  flex-1 overflow-auto">
            <div class="h-full overflow-auto border-r">
                <app-order-items-container/>
            </div>
            <div class="h-full p-2 bg-gray-200 overflow-auto">
                <app-products-container/>
            </div>
            <div class="grow h-full p-2 bg-gray-100 overflow-auto">
                <app-options-container/>
            </div>
        </div>
    </div>
    `
})
export default class MakeOrderPage implements OnInit {


    public restaurant = computed(() => this.restaurantPageService.getRestaurant());
    public user = computed(() => this.authService.getUser());

    public restaurantUrl = computed(() => `/admin/restaurant/${this.restaurant().id}/menus`)
    constructor(
        private readonly makeOrderPageService: MakeOrderPageService,
        private readonly orderService: OrderService,
        private readonly restaurantPageService: RestaurantPageService2,
        private readonly authService: AuthService
    ) {}
    ngOnInit(): void {
        this.makeOrderPageService.firstLoad();
        this.orderService.reset();
    }
}