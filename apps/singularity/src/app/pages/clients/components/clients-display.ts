import { Component, EventEmitter, input, Output } from "@angular/core";
import Client from "../classes/client.class";
import ClientDisplay from "./client-display";

@Component({
    selector: `app-clients-display`,
    template: `
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-4 gap-2 items-center justify-center text-lg font-bold">
            <h1>Identificacion</h1>
            <h1>Nombre</h1>
            <h1>Correo</h1>
            <div></div>
        </div>
        <div class="flex flex-col gap-2">
            @for (client of clients(); track client.id) {
                <app-client-display  [client]="client"/>
            }
        </div>
    </div>
    `,
    imports: [ClientDisplay]
})
export default class ClientsDisplay {


    public clients = input.required<Client[]>()
}