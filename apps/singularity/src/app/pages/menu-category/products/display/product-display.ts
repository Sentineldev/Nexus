import { Component, input } from "@angular/core";
import Product from "../../../products/classes/product.class";

@Component({
    selector: `app-product-option-display`,
    template: `
    <div (click)="openDialogHandler()" class="flex flex-col items-start cursor-pointer">
        <h1 class="font-medium text-2xl">{{product().name}}</h1>
        <p>{{product().description}}</p>
    </div>
    `,
    imports: []
})
export default class ProductOptionDisplay {

    public product = input.required<Product>();



    openDialogHandler() {}
}