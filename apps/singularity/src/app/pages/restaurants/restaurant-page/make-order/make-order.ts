import { Component, computed, OnInit } from "@angular/core";
import IndexPageService from "../../../index/index-page.service";
import RestaurantPageService from "../restaurant-page.service";
import ProductButton from "./product-button";
import ProductsContainer from "./products-container";

@Component({
    selector: `app-make-order-page`,
    imports: [ProductsContainer],

    styles: `
    `,
    template: `
    <div class="h-full flex flex-col">
        <div class="grid grid-cols-3 flex-1">
            <div class="flex flex-col gap-4 p-2">
                <div class="flex flex-col gap-3 flex-1">
                    <div class="flex gap-4 items-center">
                        <div class="text-wrap flex items-center gap-6 flex-1">
                            <p class="text-slate-600">1x</p>
                            <p class="font-bold">Sopa de patatas fritas</p>
                        </div>
                        <div>
                            <p>630.00 $</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-center">
                        <div class="text-wrap flex items-center gap-6 flex-1">
                            <p class="text-slate-600">1x</p>
                            <p class="font-bold">Sopa de patatas fritas</p>
                        </div>
                        <div>
                            <p>630.00 $</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-center">
                        <div class="text-wrap flex items-center gap-6 flex-1">
                            <p class="text-slate-600">1x</p>
                            <p class="font-bold">Sopa de patatas fritas</p>
                        </div>
                        <div>
                            <p>630.00 $</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="flex-1">
                        <button class="px-8 py-2 bg-slate-700 rounded-lg text-white">Procesar</button>
                    </div>
                    <p class="text-lg font-bold">890.32 $</p>
                </div>
            </div>
            <div class="h-full col-span-2 p-2 bg-gray-200">
                <app-products-container/>
            </div>
        </div>
    </div>
    `
})
export default class MakeOrderPage implements OnInit {
    public restaurant = computed(() => this.restaurantPageService.getRestaurant());

    constructor(
        private readonly indexPageService: IndexPageService,
        private readonly restaurantPageService: RestaurantPageService
    ) {}
    ngOnInit(): void {
        this.indexPageService.removeTopBar();
        this.restaurantPageService.stopLoading();
    }
}