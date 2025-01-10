import { Component, computed, EventEmitter, input, Output } from "@angular/core";
import Client from "../classes/client.class";
import UpdateClientModal from "../modals/update-client-modal";
import DeleteClientModal from "../modals/delete-client-modal";

@Component({
    selector: `app-client-display`,
    template: `
    <div class="grid grid-cols-5 gap-2 items-center justify-center text-slate-700">
        <p class="font-sans text-slate-700 text-[1.2rem] text-wrap break-words">{{client().identificationType}}{{client().identification}}</p>
        <p class="font-sans text-slate-700 text-[1.2rem] text-wrap break-words">{{client().fullName}}</p>
        <p class="font-sans text-slate-700 text-[1.2rem] text-wrap break-words col-span-2">{{client().email}}</p>
        <div class="flex gap-2">
            <app-update-client-modal [client]="client()" [dialogId]="updateDialogId()"/>
            <app-delete-client-modal [client]="client()" [dialogId]="deleteDialogId()"/>
        </div>
    </div>
    `,
    imports: [UpdateClientModal, DeleteClientModal]
})
export default class ClientDisplay {


    public client = input.required<Client>();

    public updateDialogId = computed(() => `update-client-modal-id-${this.client().id}`);
    public deleteDialogId = computed(() => `delete-client-modal-id-${this.client().id}`);

}