import { Component, input } from "@angular/core";
import Product from "../../../../core/classes/product.class";
import ProductOptionDisplay from "./product-display";

@Component({
    selector: `app-product-options-display`,
    template: `
    <div class="flex flex-col gap-4">
        @for (product of products(); track product.id) {
            <app-product-option-display [product]="product"/>
        }
    </div>
    `,
    imports: [ProductOptionDisplay]
})
export default class ProductOptionsDisplay {

    public products = input.required<Product[]>();
}