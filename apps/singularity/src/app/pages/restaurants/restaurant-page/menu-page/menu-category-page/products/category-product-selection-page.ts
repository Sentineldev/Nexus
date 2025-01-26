import { Component, computed } from "@angular/core";
import CategoryProducts from "./category-products/category-products";
import ProductSelectionService from "./product-selection.service";
import SaveCategoryProductModal from "./category-products/save-category-product-modal";
import AvailableProducts from "./available-products/available-products";

@Component({
    selector: `app-selection-container`,
    template: `
    @if (state().droped && state().product) {
        <app-save-category-product-modal [dialogId]="state().dialogId" [product]="state().product!"/>
    }  
    <div class="lg:grid lg:grid-cols-4 h-full">
        <div class="col-span-3">
            <app-category-products/>
        </div>    
        <div class="w-full ">
            <app-available-products/>
        </div>
    </div>
    
    `,
    imports: [AvailableProducts, CategoryProducts, SaveCategoryProductModal]
})
export default class CategoryProductSelectionPage {



    public state =  computed(() => this.selectionService.getState());
    constructor(
        private readonly selectionService: ProductSelectionService
    ) {}
}