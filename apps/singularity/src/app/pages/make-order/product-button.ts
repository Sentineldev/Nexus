import { Component, EventEmitter, input, Output } from "@angular/core";
import CategoryProduct from "../../core/classes/category-product.class";
import OrderService from "./order-service";

@Component({
    selector: `app-product-button`,
    template: `
    <button (click)="onClickHandler()" class="  w-[180px] h-48 max-h-48 bg flex flex-col hover:opacity-90 transition-all">
        <div class="h-[70%] w-full">
            <img class="rounded-t-lg w-full h-full" src="/imgs/product-placeholder.jpg" alt="Product image">
        </div>                        
        <div class="text-start p-2 rounded-b-lg bg-white h-full max-h-full w-full">
            <p class="line-clamp-2 text-[0.9rem] text-slate-70 min-h-[40px]">{{product().product.name}}</p>
            <p class="font-bold">{{product().price}} $</p>
        </div>
    </button>

    `
})
export default class ProductButton {    


    public product = input.required<CategoryProduct>();


    constructor(
        private readonly orderService: OrderService
    ) {}

    onClickHandler() {
        this.orderService.addProduct(this.product());
    }
}