import { Component, computed } from "@angular/core";
import DialogToggler from "../../components/dialog/dialog-toggler";
import SetClientModal from "./modals/set-client-modal";
import OrderService from "./order-service";
import RoomServiceModal from "./modals/room-service-modal";
import OrderConfirmationModal from "./modals/order-confirmation-modal";
import DialogUtils from "../../utils/dialog";

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
            <div class="btn w-24 h-24 flex justify-center items-center">Cliente</div>
        </app-dialog-toggler>
        <app-dialog-toggler dialogId="room-service-modal">
            <div class="btn w-24 h-24 flex justify-center items-center">Room Service</div>
        </app-dialog-toggler>
        <button class="h-24 w-24 btn flex items-center justify-center">Seleccionar Mesa</button>
        <div class="flex-1 flex items-end">
            <button (click)="onProcessHandler()" [disabled]="!state().readyToProcess" class="h-24  w-24 btn">Procesar</button>
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