import { Component, computed, EventEmitter, Inject, input, Output, signal } from "@angular/core";
import Client from "../classes/client.class";
import ClientsService from "../client.service";
import ClientRepository from "../../../shared/interfaces/client-repository.interface";
import ApiClientRepository from "../../../shared/repositories/api-client-repository";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import { Loader } from "../../../shared/loader/loader";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import { SuccessAlert } from "../../../shared/alerts/success-alert";

@Component({
    selector: `app-delete-client-modal`,
    template: `
    <div>
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-slate-700">Eliminar Cliente</h1>
                    @if (errorMessage() || successMessage()) {
                        @if(errorMessage()) {
                            <app-error-alert [message]="errorMessage()"/>
                        }
                        @if(successMessage()) {
                            <app-success-alert [message]="successMessage()"/>
                        }
                    }
                </div>
                
                <div class="border border-slate-300 p-2 rounded-lg">
                    <p class="font-sans text-[0.9rem]">Nombre Completo: {{ client().fullName }}</p>
                    <p class="font-sans text-[0.9rem]">Identificacion: {{ client().identificationType }}{{ client().identification }}</p>
                    <p class="font-sans text-[0.9rem]">Correo: {{ client().email }}</p>
                </div>
                <div>
                    <button [disabled]="loading()" (click)="onClickHandler()" type="button" class="w-full bg-red-500 p-2 text-white rounded-lg">
                        @if (loading()) {
                            <app-loader/>
                        }
                        @else {
                            Eliminar
                        }
                    </button>
                </div>
            </div>
        </div>
    </app-custom-dialog>
    <app-dialog-toggler [dialogId]="dialogId()">
        <h1 class="text-slate-700 text-[1rem]">
            <img class="" src="./svg/trash-svgrepo-com.svg" alt="trash-icon" width="32" height="32">
        </h1>
    </app-dialog-toggler>
</div>
    `,
    imports: [DialogToggler, Loader, ErrorAlert, CustomDialog, SuccessAlert]
})
export default class DeleteClientModal {

    public client = input.required<Client>();
    public dialogId = input.required<string>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    constructor(
        private readonly service: ClientsService,
        @Inject(ApiClientRepository)
        private readonly repository: ClientRepository
    ) {}


    onClickHandler() {
        this.loading.set(true);
        this.errorMessage.set("");
        this.repository.delete(this.client().id).subscribe((result) => {
        setTimeout(() => {
            this.loading.set(false);
            if (result === "") {
                this.service.refreshPage()
                this.successMessage.set("Eliminado correctamente");
                return;
            }
            this.errorMessage.set("No se pudo eliminar");
        }, 1000);
        })
    }
}