import { Component, computed, input } from "@angular/core";
import Client from "../../../core/classes/client.class";
import UpdateClientModal from "../modals/update-client-modal";
import DeleteClientModal from "../modals/delete-client-modal";

@Component({
    selector: `app-client-display`,
    template: `
    <div class="grid grid-cols-4 gap-2 items-center justify-center ">
        <div class="flex flex-col">
            <p class="font-medium">{{client().fullName}}</p>
            <p class="text-neutral">{{client().identificationType}}{{client().identification}}</p>
        </div>
        <p class="col-span-2">{{client().email}}</p>
        <div class="flex gap-4">
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