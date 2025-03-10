import { Component, computed, input } from "@angular/core";
import ModifyQuantityModal from "./modals/modify-quantity-modal";
import DialogUtils from "../../utils/dialog";
import { OrderProductState } from "./order-service";

@Component({
    selector: `app-order-list-item`,
    imports: [ModifyQuantityModal],
    template: `
    <app-modify-quantity-modal [dialogId]="dialogId()" [quantity]="product().quantity" [product]="product()" />
    <!-- <div (click)="onClickHandler()" class="flex gap-4 items-center hover:bg-slate-300 p-3 cursor-pointer">
        <div class="text-wrap flex items-center gap-6 flex-1">
            <p class=" text-[0.9rem] text-slate-600">{{product().quantity}}x</p>
            <p class="text-slate-900 text-[0.8rem]">{{product().product.product.name}}</p>
        </div>
        <div>
            <p class="text-[0.9rem]">{{product().total}} $</p>
        </div>
    </div> -->
    <button (click)="onClickHandler()" class="w-full  flex flex-col gap-1">
        <div class="flex items-center justify-center w-full">
            <h2 class="flex-1 text-slate-800 text-lg text-start">{{product().product.product.name}}</h2>
            <p>{{product().quantity}}x</p>
        </div>
        <div>
            <p class="text-right font-bold text-lg">{{product().total}} $</p>
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