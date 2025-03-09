import { Component, input } from "@angular/core";
import { OrderProductState } from "./order-service";
import OrderListItem from "./order-list-item";

@Component({
    selector: `app-order-list-items`,
    template: `

    <div class="p-3 flex flex-col gap-3 overflow-auto h-full">
        <h1 class="font-bold text-xl">Detalles de Orden</h1>
        <div class="flex-1 overflow-auto flex flex-col gap-2">
        @for (product of products(); track product.product.product.id; let i = $index) {
            @if (i < products().length - 1) {
                <div  class="border-b border-slate-300 py-2">
                    <app-order-list-item [product]="product"/>
                </div>
            } @else {
                <div  class="py-2">
                    <app-order-list-item [product]="product"/>
                </div>
            }
        }
        </div>
    </div>
    `,
    imports: [OrderListItem]
})
export default class OrderListItems {

    public products =  input.required<OrderProductState[]>();
}