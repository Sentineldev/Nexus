import { Component, computed } from "@angular/core";
import DialogToggler from "../../../../shared/dialog/dialog-toggler";
import SetClientModal from "./modals/set-client-modal";
import OrderService from "./order-service";
import RoomServiceModal from "./modals/room-service-modal";
import OrderConfirmationModal from "./modals/order-confirmation-modal";
import DialogUtils from "../../../../utils/dialog";

@Component({
    selector: `app-options-container`,
    template: `
    <app-set-client-modal/>
    <app-room-service-modal/>
    @if (state().readyToProcess) {
        <app-order-confirmation-modal/>
    }
    <div class="flex flex-col gap-4 h-full">
        
        <app-dialog-toggler dialogId="save-client-modal">
            <button class="h-24 w-24 bg-white text-sm text-black rounded-xl">Cliente</button>
        </app-dialog-toggler>
        <app-dialog-toggler dialogId="room-service-modal">
            <button class="h-24 w-24 bg-white text-sm text-black rounded-xl">Room Service</button>
        </app-dialog-toggler>
        <button class="h-24 w-24 bg-white text-sm text-black rounded-xl">Seleccionar Mesa</button>
        <div class="flex-1 flex items-end">
            <button (click)="onProcessHandler()" [disabled]="!state().readyToProcess" class="h-24  w-24 bg-white text-sm text-black rounded-xl">Procesar</button>
        </div>
    </div>
    `,
    imports: [DialogToggler, SetClientModal, RoomServiceModal, OrderConfirmationModal]
})
export default class OptionsContainer {

    public state = computed(() => this.orderService.getState());
    constructor(
        private readonly orderService: OrderService
    ) {}


    onProcessHandler() {
        DialogUtils.OpenModal("order-confirmation-modal");
    }
}