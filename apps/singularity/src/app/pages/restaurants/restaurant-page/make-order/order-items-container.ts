import { Component, computed } from "@angular/core";
import OrderService from "./order-service";
import OrderListItem from "./order-list-item";
import ClientInformationContainer from "./client-information-container";

@Component({
    selector: `app-order-items-container`,
    template: `
    <div class="flex flex-col gap-2 p-2 h-full">

        <app-client-information-container/>
        <div class="flex flex-col gap-2 flex-1">

            @for (product of products(); track $index) {
                <app-order-list-item [product]="product"/>
                
            }
        </div>
        <div class="flex items-end justify-end">
            <p class="text-2xl font-bold">{{total()}} $</p>
        </div>
    </div>
    `,
    imports: [OrderListItem, ClientInformationContainer],
})
export default class OrderItemsContainer {

    public products = computed(() => this.service.getOrderProducts());
    public total = computed(() => this.service.getTotal());

    constructor(
        private readonly service: OrderService
    ) {}
}