import { Component, computed, input } from "@angular/core";
import { SaveOrderProduct } from "./order-service";
import ModifyQuantityModal from "./modify-quantity-modal";
import DialogUtils from "../../../../utils/dialog";

@Component({
    selector: `app-order-list-item`,
    imports: [ModifyQuantityModal],
    template: `
    <app-modify-quantity-modal [dialogId]="dialogId()" [quantity]="product().quantity" [product]="product()" />
    <div (click)="onClickHandler()" class="flex gap-4 items-center hover:bg-slate-300 p-3 cursor-pointer">
        <div class="text-wrap flex items-center gap-6 flex-1">
            <p class="text-slate-600">{{product().quantity}}x</p>
            <p class="font-bold">{{product().product.product.name}}</p>
        </div>
        <div>
            <p>{{product().total}} $</p>
        </div>
    </div>
    `
})
export default class OrderListItem {

    public product = input.required<SaveOrderProduct>();

    public dialogId = computed(() => `modify-quantity-product-${this.product().product.id}`);



    onClickHandler() {

        DialogUtils.OpenModal(this.dialogId());
    }
}