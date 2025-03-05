import { Component, input } from "@angular/core";
import Product from "../../products/classes/product.class";
import ProductDisplay2 from "./product-display";

@Component({
    selector: `app-products-display2`,
    template: `
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-3 gap-4">
            <div>
                <h1 class="font-medium text-lg text-primary">Nombre</h1>
            </div>
            <div>
                <h1 class="font-medium text-lg text-primary">Descripcion</h1>
            </div>
            <div></div>
        </div>
        <div class="flex flex-col gap-4">
            @for (product of products(); track product.id) {
                <app-product-display2 [product]="product"/>
            }
        </div>
    </div>
    `,
    imports: [ProductDisplay2]
})
export default class ProductsDisplay2 {

    public products = input.required<Product[]>();

    constructor() {}
}