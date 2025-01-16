import { Component, computed } from "@angular/core";
import OrderService from "./order-service";

@Component({
    selector: `app-client-information-container`,
    template: `

        <!-- @if (state().isClientSet) {
            <div class="px-3 flex items-center gap-2">
                <img width="32" height="32" src="/svg/person-svgrepo-com.svg"/>
                <div>
                    <h1 class="text-[0.8rem]">{{state().client.name}}</h1>
                    <p class="text-[0.8rem]">{{state().client.identificationType}}{{state().client.identification}}</p>
                </div>
            </div>            
        } -->
        <div class="flex flex-col gap-2">
            <div class="bg-slate-700 text-center text-white p-1">
                {{state().type}}
            </div>
            <div class="flex items-center gap-2">
                
                <img width="48" height="48" src="/svg/person-svgrepo-com.svg"/>
                <div class="flex-1">
                    <h1 class="text-[0.9rem]">{{state().client.name.length === 0 ? "Cliente" : state().client.name}}</h1>
                    <p class="text-[0.9rem]">{{state().client.identificationType}}{{state().client.identification}}</p>
                </div>
                @if (isRoomService()) {
                    <div class="h-12 w-12 bg-slate-800 rounded-full text-xs text-white flex items-center justify-center">
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