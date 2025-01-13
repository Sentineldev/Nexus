import { Component, computed } from "@angular/core";
import OrderService from "./order-service";
import OrderListItem from "./order-list-item";

@Component({
    selector: `app-order-items-container`,
    template: `
    <div class="flex flex-col gap-4 p-2 h-full">
        <div class="flex flex-col gap-3 flex-1">

            @for (product of products(); track $index) {
                <app-order-list-item [product]="product"/>
            }
        </div>
        <div class="flex items-center">
            <div class="flex-1">
                <button class="px-8 py-2 bg-slate-700 rounded-lg text-white">Procesar</button>
            </div>
            <p class="text-lg font-bold">{{total()}} $</p>
        </div>
    </div>
    `,
    imports: [OrderListItem],
})
export default class OrderItemsContainer {

    public products = computed(() => this.service.getOrderProducts());
    public total = computed(() => this.service.getTotal());

    constructor(
        private readonly service: OrderService
    ) {}
}