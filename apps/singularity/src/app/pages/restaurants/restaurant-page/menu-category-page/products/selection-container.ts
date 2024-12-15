import { Component, computed } from "@angular/core";
import AvailableProducts from "./available-products/available-products";
import CategoryProducts from "./category-products/category-products";
import ProductSelectionService from "./product-selection.service";
import SaveCategoryProductModal from "./category-products/save-category-product-modal";

@Component({
    selector: `app-selection-container`,
    template: `
    @if (state().droped && state().product) {
        <app-save-category-product-modal [dialogId]="state().dialogId" [product]="state().product!"/>
    }  
    <div class="grid grid-cols-4 gap-4 h-full px-3 ">
        <div class="col-span-3">
            <app-category-products/>
        </div>    
        <div class="">
            <app-available-products/>
        </div>
    </div>
    
    `,
    imports: [AvailableProducts, CategoryProducts, SaveCategoryProductModal]
})
export default class SelectionContainer {



    public state =  computed(() => this.selectionService.getState());
    constructor(
        private readonly selectionService: ProductSelectionService
    ) {}
}