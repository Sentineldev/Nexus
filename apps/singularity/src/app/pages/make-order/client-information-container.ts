import { Component, computed } from "@angular/core";
import OrderService from "./order-service";

@Component({
    selector: `app-client-information-container`,
    template: `

        <div class="flex flex-col gap-1 p-3">
            <h1 class="text-xl font-bold text-primary">Informacion del Cliente</h1>
            <div class="flex items-center justify-center">
                <div class="flex-1">
                    <h1 class="text-lg font-bold">{{state().client.name}}</h1>
                    <p class="text-slate-500">{{state().type}}</p>
                </div>
                @if (isRoomService()) {
                    <div class="h-12 w-12 bg-primary font-medium rounded-xl px-2 text-xs text-white flex items-center justify-center">
                        <span>H{{state().location}}</span>
                    </div>
                }
            </div>
        </div>
    `
})
export default class ClientInformationContainer {


    public state = computed(() => this.service.getState());
    public isRoomService = computed(() => this.service.isRoomService());

    constructor(
        private readonly service: OrderService
    ) {}
}