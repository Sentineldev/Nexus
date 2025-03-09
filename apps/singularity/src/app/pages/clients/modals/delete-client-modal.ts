import { Component, Inject, input, signal } from "@angular/core";
import Client from "../../../core/classes/client.class";
import ClientsService from "../client.service";
import ClientRepository from "../../../core/interfaces/client-repository.interface";
import ApiClientRepository from "../../../core/api/api-client-repository";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import { Loader } from "../../../components/loader/loader";
import { ErrorAlert } from "../../../components/alerts/error-alert";
import CustomDialog from "../../../components/dialog/custom-dialog";
import { SuccessAlert } from "../../../components/alerts/success-alert";

@Component({
    selector: `app-delete-client-modal`,
    template: `
    <div>
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-primary font-medium">Eliminar Cliente</h1>
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
                    <button [disabled]="loading()" (click)="onClickHandler()" type="button" class="btn w-full">
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
        <div class="btn">
            <img class="" src="./svg/trash-svgrepo-com.svg" alt="trash-icon" width="24" height="24">
        </div>
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