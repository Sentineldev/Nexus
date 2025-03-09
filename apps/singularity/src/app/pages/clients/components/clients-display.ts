import { Component, input } from "@angular/core";
import Client from "../../../core/classes/client.class";
import ClientDisplay from "./client-display";

@Component({
    selector: `app-clients-display`,
    template: `
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-5 gap-2 items-center justify-center text-lg font-bold text-primary border-b border-b-neutral py-4">
            <h1>Identificacion</h1>
            <h1>Nombre</h1>
            <h1 class="col-span-2">Correo</h1>
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