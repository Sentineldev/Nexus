import { Component, computed } from "@angular/core";
import OrderService from "./order-service";
import ClientInformationContainer from "./client-information-container";
import OrderListItems from "./order-list-items";

@Component({
    selector: `app-order-items-container`,
    template: `
    <div class="flex flex-col h-full overflow-auto ">
        <div class="border-b border-slate-300">
            <app-client-information-container/>
        </div>
        <div class="flex-1 border-b border-slate-300 overflow-auto">
            <!-- @for (product of products(); track $index) {
                <app-order-list-item [product]="product"/>
                
            } -->
            <app-order-list-items [products]="products()"/>    
        </div>
        <div>
            <div class="p-3 flex justify-center items-center">
                <p class="flex-1 text-xl">Total:</p>
                <p class="text-2xl font-bold text-primary">{{total()}} $</p>
            </div>
        </div>
    </div>
    `,
    imports: [ClientInformationContainer, OrderListItems],
})
export default class OrderItemsContainer {

    public products = computed(() => this.service.getOrderProducts());
    public total = computed(() => this.service.getTotal());

    constructor(
        private readonly service: OrderService
    ) {}
}