import { Component, computed, input } from "@angular/core";
import EditProductModal2 from "../modals/edit-product-modal";
import DeleteProductModal2 from "../modals/delete-product-modal";
import DialogToggler from "../../../../components/dialog/dialog-toggler";
import Product from "../../../../core/classes/product.class";

@Component({
    selector: `app-product-display2`,
    template: `
    <app-edit-product-modal2 [dialogId]="updateDialogId()" [product]="product()"/>
    <app-delete-product-modal2 [dialogId]="deleteDialogId()" [product]="product()"/>
    <div class="grid grid-cols-3 gap-4 items-center">
        <div>
            <h1>{{product().name}}</h1>
        </div>
        <div>
            <h1 class="text-wrap">{{product().description}}</h1>
        </div>
        <div class="flex gap-4">
            <app-dialog-toggler [dialogId]="updateDialogId()">
                <div class="w-fit btn">
                    <img src="/svg/edit-svgrepo-com.svg" width="24" height="24"/>
                </div>
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="deleteDialogId()">
                <div class="w-fit btn">
                    <img src="/svg/trash-svgrepo-com.svg" width="24" height="24"/>
                </div>
            </app-dialog-toggler>
        </div>
    </div>
    `,
    imports: [EditProductModal2, DeleteProductModal2, DialogToggler]
})
export default class ProductDisplay2 {
    
    public product = input.required<Product>();

    public updateDialogId = computed(() => `update-product-form-modal-${this.product().id}`);
    public deleteDialogId = computed(() => `delete-product-form-modal-${this.product().id}`);

    constructor() {}
}