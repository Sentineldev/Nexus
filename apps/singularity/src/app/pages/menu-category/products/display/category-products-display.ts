import { Component, input } from "@angular/core";
import CategoryProduct from "../../../../core/classes/category-product.class";
import CategoryProductDisplay2 from "./category-product-display";

@Component({
    selector: `app-category-products-display2`,
    template: `
    
    <div class="flex flex-col gap-4">
        @for (product of products(); track product.id) {
            <app-category-product-display2 [product]="product"/>
        }
        @if (products().length === 0) {
            <p class="text-neutral">No hay productos registrados...</p>
        }
    </div>
    `,
    imports: [CategoryProductDisplay2]
})
export default class CategoryProductsDisplay2 {

    public products = input.required<CategoryProduct[]>();
}