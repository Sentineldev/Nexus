import { Component, OnInit } from "@angular/core";
import IndexPageService from "../index/index-page.service";
import ProductsContainer from "./products-container";
import MakeOrderPageService from "./make-order-page.service";
import OrderItemsContainer from "./order-items-container";
import OptionsContainer from "./options-container";
import OrderService from "./order-service";

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
    <div class="h-full flex flex-col overflow-auto">
        <div class=" main-container  flex-1 overflow-auto">
            <div class="h-full overflow-auto">
                <app-order-items-container/>
            </div>
            <div class="h-full p-2 bg-gray-100 overflow-auto">
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
    constructor(
        private readonly indexPageService: IndexPageService,
        private readonly makeOrderPageService: MakeOrderPageService,
        private readonly orderService: OrderService,
    ) {}
    ngOnInit(): void {
        this.indexPageService.removeTopBar();
        this.makeOrderPageService.firstLoad();
        this.orderService.reset();
    }
}