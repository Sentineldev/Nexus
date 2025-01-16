import { Component, computed, input } from "@angular/core";
import ModifyQuantityModal from "./modals/modify-quantity-modal";
import DialogUtils from "../../../../utils/dialog";
import { OrderProductState } from "./order-service";

@Component({
    selector: `app-order-list-item`,
    imports: [ModifyQuantityModal],
    template: `
    <app-modify-quantity-modal [dialogId]="dialogId()" [quantity]="product().quantity" [product]="product()" />
    <div (click)="onClickHandler()" class="flex gap-4 items-center hover:bg-slate-300 p-3 cursor-pointer">
        <div class="text-wrap flex items-center gap-6 flex-1">
            <p class=" text-[0.9rem] text-slate-600">{{product().quantity}}x</p>
            <p class="text-slate-900 text-[0.8rem]">{{product().product.product.name}}</p>
        </div>
        <div>
            <p class="text-[0.9rem]">{{product().total}} $</p>
        </div>
    </div>
    `
})
export default class OrderListItem {

    public product = input.required<OrderProductState>();

    public dialogId = computed(() => `modify-quantity-product-${this.product().product.id}`);



    onClickHandler() {

        DialogUtils.OpenModal(this.dialogId());
    }
}