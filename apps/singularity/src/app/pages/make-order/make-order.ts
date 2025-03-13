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
                <svg height="42px" width="42px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#FF4E15"></path> </g></svg>
                <a [href]="restaurantUrl()" class="font-bold text-primary text-3xl py-2">{{restaurant().name}}</a>
            </div>
            <div class="flex items-center gap-2">
                <svg height="42px" width="42px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#FF4E15;" cx="256" cy="256" r="256"></circle> <path style="fill:#e13700;" d="M494.07,350.292l-213.882-213.88l-10.164,40.989l-9.375-9.375L108.606,383.847l127.379,127.378 c6.604,0.51,13.279,0.774,20.016,0.774C364.085,512,456.521,445.014,494.07,350.292z"></path> <path style="fill:#FFFFFF;" d="M108.606,383.847h237.899v-96.039c0-22.395-18.156-40.551-40.551-40.551H149.158 c-22.397,0-40.551,18.156-40.551,40.551V383.847z"></path> <path style="fill:#D0D1D3;" d="M346.505,287.808c0-22.395-18.156-40.551-40.551-40.551h-78.684v136.59h119.236V287.808z"></path> <circle style="fill:#FFEDB5;" cx="227.556" cy="186.354" r="72.576"></circle> <path style="fill:#FEE187;" d="M227.556,113.778c-0.097,0-0.19,0.007-0.286,0.007v145.144c0.097,0,0.19,0.007,0.286,0.007 c40.084,0,72.58-32.496,72.58-72.58C300.135,146.273,267.64,113.778,227.556,113.778z"></path> <path style="fill:#808183;" d="M220.982,278.957l-22.03,11.014c-5.934,2.967-12.914-1.348-12.914-7.982v-23.538 c0-6.634,6.982-10.949,12.914-7.982l22.03,11.014V278.957z"></path> <g> <path style="fill:#59595B;" d="M233.843,261.487l22.03-11.014c5.934-2.967,12.914,1.348,12.914,7.982v23.538 c0,6.634-6.982,10.949-12.914,7.982l-22.03-11.014V261.487z"></path> <path style="fill:#59595B;" d="M234.874,282.234h-14.681c-2.581,0-4.672-2.091-4.672-4.672v-14.681 c0-2.581,2.091-4.672,4.672-4.672h14.681c2.581,0,4.672,2.091,4.672,4.672v14.681C239.545,280.143,237.454,282.234,234.874,282.234 z"></path> </g> <g> <circle style="fill:#D0D1D3;" cx="227.556" cy="305.993" r="7.758"></circle> <circle style="fill:#D0D1D3;" cx="227.556" cy="333.576" r="7.758"></circle> <circle style="fill:#D0D1D3;" cx="227.556" cy="362.02" r="7.758"></circle> </g> <path style="fill:#272525;" d="M234.874,258.21h-7.604v24.024h7.604c2.581,0,4.672-2.091,4.672-4.672v-14.681 C239.545,260.301,237.454,258.21,234.874,258.21z"></path> <g> <path style="fill:#A6A8AA;" d="M227.556,298.236c-0.098,0-0.19,0.026-0.286,0.029v15.457c0.097,0.003,0.188,0.029,0.286,0.029 c4.284,0,7.758-3.474,7.758-7.758S231.841,298.236,227.556,298.236z"></path> <path style="fill:#A6A8AA;" d="M227.556,325.818c-0.098,0-0.19,0.026-0.286,0.029v15.457c0.097,0.003,0.188,0.029,0.286,0.029 c4.284,0,7.758-3.474,7.758-7.758S231.841,325.818,227.556,325.818z"></path> <path style="fill:#A6A8AA;" d="M227.556,354.263c-0.098,0-0.19,0.026-0.286,0.029v15.457c0.097,0.003,0.188,0.029,0.286,0.029 c4.284,0,7.758-3.474,7.758-7.758S231.841,354.263,227.556,354.263z"></path> </g> <path style="fill:#FFC61B;" d="M255.424,394.485c0-46.971,38.078-85.049,85.049-85.049s85.049,38.078,85.049,85.049H255.424z"></path> <path style="fill:#EAA22F;" d="M340.471,309.438c-0.193,0-0.381,0.014-0.574,0.014v85.033h85.623 C425.52,347.514,387.443,309.438,340.471,309.438z"></path> <circle style="fill:#E09112;" cx="340.471" cy="301.39" r="6.896"></circle> <path style="fill:#FF5419;" d="M340.471,294.497c-0.197,0-0.381,0.041-0.574,0.059v13.676c0.193,0.017,0.378,0.059,0.574,0.059 c3.808,0,6.896-3.088,6.896-6.896C347.369,297.584,344.281,294.497,340.471,294.497z"></path> <path style="fill:#E09112;" d="M252.526,404.149h175.89c4.27,0,7.732-3.462,7.732-7.732l0,0c0-4.27-3.462-7.732-7.732-7.732h-175.89 c-4.27,0-7.732,3.462-7.732,7.732l0,0C244.795,400.687,248.256,404.149,252.526,404.149z"></path> <path style="fill:#FF5419;" d="M428.418,388.687h-88.519v15.463h88.519c4.27,0,7.732-3.462,7.732-7.732 C436.15,392.149,432.687,388.687,428.418,388.687z"></path> </g></svg>
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