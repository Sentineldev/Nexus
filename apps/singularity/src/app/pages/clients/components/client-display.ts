import { Component, input } from "@angular/core";
import Client from "../classes/client.class";

@Component({
    selector: `app-client-display`,
    template: `
    <div class="grid grid-cols-3 gap-2 items-center justify-center text-slate-700">
        <p>{{client().identificationType}}{{client().identification}}</p>
        <p>{{client().fullName}}</p>
        <p>{{client().email}}</p>
    </div>
    `
})
export default class ClientDisplay {

    public client = input.required<Client>();
}