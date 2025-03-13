import { Component, computed, input } from "@angular/core";
import ModifyQuantityModal from "./modals/modify-quantity-modal";
import DialogUtils from "../../utils/dialog";
import { OrderProductState } from "./order-service";

@Component({
    selector: `app-order-list-item`,
    imports: [ModifyQuantityModal],
    template: `
    <app-modify-quantity-modal [dialogId]="dialogId()" [quantity]="product().quantity" [product]="product()" />
    <button (click)="onClickHandler()" class="w-full  flex flex-col gap-1 outline-none cursor-pointer">
        <div class="flex items-center justify-center w-full gap-2">
            <h2 class="flex-1 text-slate-800 text-lg text-start">{{product().product.product.name}}</h2>
            <p>{{product().quantity}}x</p>
        </div>
        <div>
            <p class="text-right font-bold text-lg text-primary">{{product().total}} $</p>
        </div>
    </button>
    `
})
export default class OrderListItem {

    public product = input.required<OrderProductState>();

    public dialogId = computed(() => `modify-quantity-product-${this.product().product.id}`);



    onClickHandler() {

        DialogUtils.OpenModal(this.dialogId());
    }
}