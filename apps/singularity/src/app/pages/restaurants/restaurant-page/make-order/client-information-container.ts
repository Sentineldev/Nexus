import { Component, computed } from "@angular/core";
import OrderService from "./order-service";

@Component({
    selector: `app-client-information-container`,
    template: `

        @if (state().isClientSet) {
            <div class="px-3 flex items-center gap-2">
                <img width="32" height="32" src="/svg/person-svgrepo-com.svg"/>
                <div>
                    <h1 class="text-[0.8rem]">{{state().client.name}}</h1>
                    <p class="text-[0.8rem]">{{state().client.identificationType}}{{state().client.identification}}</p>
                </div>
            </div>
        }
    `
})
export default class ClientInformationContainer {


    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: OrderService
    ) {}
}