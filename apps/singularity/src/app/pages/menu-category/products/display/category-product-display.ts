import { Component, input } from "@angular/core";
import CategoryProduct from "../../../restaurants/classes/category-product.class";

@Component({
    selector: `app-category-product-display2`,
    template: `
    <div class="flex items-center">
        <div class="flex-1">
            <h1 class="font-medium text-2xl text-black">{{product().product.name}}</h1>
            <p class="text-neutral text-lg">
                @if (product().isActive) {
                    Activo
                } @else {
                    Inactivo
                }
            </p>
        </div>
        <div>
            <p class="font-medium text-primary text-2xl">{{product().price}} $</p>
        </div>
    </div>
    `
})
export default class CategoryProductDisplay2 {

    public product = input.required<CategoryProduct>();
}