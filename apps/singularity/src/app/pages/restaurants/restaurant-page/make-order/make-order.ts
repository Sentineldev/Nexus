import { Component, computed, OnInit } from "@angular/core";
import IndexPageService from "../../../index/index-page.service";
import RestaurantPageService from "../restaurant-page.service";
import ProductButton from "./product-button";
import ProductsContainer from "./products-container";
import MakeOrderPageService from "./make-order-page.service";
import OrderItemsContainer from "./order-items-container";
import OptionsContainer from "./options-container";

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
    <div class="h-full flex flex-col">
        <div class=" main-container  flex-1">
            <div class="h-full">
                <app-order-items-container/>
            </div>
            <div class="h-full p-2 bg-gray-100">
                <app-products-container/>
            </div>
            <div class="flex-grow h-full p-2 bg-gray-100">
                <app-options-container/>
            </div>
        </div>
    </div>
    `
})
export default class MakeOrderPage implements OnInit {
    constructor(
        private readonly indexPageService: IndexPageService,
        private readonly makeOrderPageService: MakeOrderPageService
    ) {}
    ngOnInit(): void {
        this.indexPageService.removeTopBar();
        this.makeOrderPageService.firstLoad();
    }
}