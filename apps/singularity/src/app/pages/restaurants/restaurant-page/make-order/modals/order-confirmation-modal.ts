import { Component, computed, Inject, signal } from "@angular/core";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import OrderService from "../order-service";
import RestaurantPageService from "../../restaurant-page.service";
import ApiOrderRepository from "../../../../../shared/repositories/api/order-api-repository";
import OrderRepository from "../../../../../shared/interfaces/order-repository.interface";
import { SaveOrder, SaveOrderProduct } from "../../../../../shared/interfaces/types/order.type";
import { Loader } from "../../../../../shared/loader/loader";
import SlideAlert from "../../../../../shared/alerts/slide-alert/slide-alert";

@Component({
    selector: `app-order-confirmation-modal`,
    imports: [CustomDialog, Loader, SlideAlert],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        @if (showMessage()) {
            <app-slide-alert message="hello world!"/>
        }
        <div class="p-6 bg-white m-auto lg:w-[380px] h-full rounded-xl flex flex-col gap-4 overflow-auto">
            <div class="flex-1">
                <h1 class="text-center font-sans text-xl font-bold text-slate-600">Procesar Orden</h1>
                <div class="text-center">
                    <h1 class=" text-slate-700">{{order().type}}</h1>
                </div>
                <div>
                    <p class="text-slate-700 text-[0.9rem]">{{restaurant().name}}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <h1 class="text-[1rem] font-bold">Cliente</h1>
                    <p class="text-slate-700 text-[0.9rem]">{{order().client.name}}</p>
                    <p class="text-slate-700 text-[0.9rem]">{{order().client.identificationType}}{{order().client.identification}}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <h1 class="text-[1rem] font-bold">{{order().type === "RESTAURANT" ? "Mesa" : "Habitacion"}}</h1>
                    @if (order().type === "ROOM_SERVICE") {
                        <p class="text-slate-700 text-[0.9rem]">{{order().location}}</p>
                    }
                </div>
                <div class="flex flex-col gap-1">
                    <h1 class="text-[1rem] font-bold">Productos</h1>
                    <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-4 gap-2 items-center justify-center">
                            <div class="col-span-3">
                                <p class="text-[0.9rem]">Descripcion</p>
                            </div>
                            <div>
                                <p class="text-[0.9rem]">Total</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            @for (product of order().products; track $index) {
                                <div class="grid grid-cols-4 items-center justify-center gap-2">
                                    <div class="col-span-3">
                                        <p class="text-[0.9rem] text-slate-700">{{product.quantity}}x {{product.product.product.name}}</p>
                                    </div>
                                    <div>
                                        <p class="text-[0.9rem] text-slate-700">{{product.total}} $</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button (click)="showMessageHandler()">Mostrar</button>
                <button [disabled]="loading()" (click)="onConfirmHandler()" class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">
                    @if (!loading()) {
                        Procesar
                    } @else {
                        <app-loader />
                    }
                </button>
            </div>
        </div>
    </app-custom-dialog>
    `,
})
export default class OrderConfirmationModal {
    
    
    public dialogId  = signal<string>("order-confirmation-modal");

    public order = computed(() => this.service.getState());

    public restaurant = computed(() => this.restaurantPageService.getRestaurant());


    public showMessage = signal(false);

    public loading = signal<boolean>(false);
    public errorMessage = signal<string>("");

    constructor(
        private readonly service: OrderService,
        private readonly restaurantPageService: RestaurantPageService,
        @Inject(ApiOrderRepository)
        private readonly repository: OrderRepository
    ) {}

    showMessageHandler() {
        this.showMessage.update((current) => !current);
    }
 
    onConfirmHandler() {

        const order = this.order();

        const products: SaveOrderProduct[] = order.products.map(({ product: { id }, quantity }) => ({ productId: id, quantity: quantity }))
        const body: SaveOrder = {
            clientId: order.client.identification,
            location: order.location,
            products: products,
            total: order.total,
            type: order.type,
        };
        this.loading.set(true);
        this.repository.save(body).subscribe((result) => {
            setTimeout(() => {
                this.loading.set(false);
                if (result.length === 0) {
                    return;
                }
                this.errorMessage.set(result);
            }, 1000);

        })
    }
}