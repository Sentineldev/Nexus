import { Component, computed, input } from "@angular/core";
import Product from "../../../products/classes/product.class";
import DialogToggler from "../../../../shared/dialog/dialog-toggler";
import AddProductToMenuModal from "../modals/add-product-to-menu";

@Component({
    selector: `app-product-option-display`,
    template: `

    <app-add-product-to-menu-modal [dialogId]="dialogId()" [product]="product()"/>
    <app-dialog-toggler [dialogId]="dialogId()">
        <div class="flex flex-col items-start cursor-pointer">
            <h1 class="font-medium text-2xl">{{product().name}}</h1>
            <p>{{product().description}}</p>
        </div>
    </app-dialog-toggler>
    `,
    imports: [DialogToggler, AddProductToMenuModal]
})
export default class ProductOptionDisplay {

    public product = input.required<Product>();

    public dialogId = computed(() => `add-product-to-category-${this.product().id}`);


    openDialogHandler() {}
}