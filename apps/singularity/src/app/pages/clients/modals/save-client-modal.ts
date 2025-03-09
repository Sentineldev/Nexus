import { Component, Inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../components/alerts/error-alert";
import { SuccessAlert } from "../../../components/alerts/success-alert";
import CustomDialog from "../../../components/dialog/custom-dialog";
import ClientRepository, { SaveClient } from "../../../core/interfaces/client-repository.interface";
import ApiClientRepository from "../../../core/api/api-client-repository";
import { Loader } from "../../../components/loader/loader";
import ClientsService from "../client.service";
import ReactiveFormInput from "../../../components/forms/reactive-input";
import ReactiveSelectInput from "../../../components/forms/reactive-select-input";

@Component({
    selector: `app-save-client-modal`,
    imports: [CustomDialog, ErrorAlert, SuccessAlert, ReactiveFormsModule, Loader, ReactiveFormInput, ReactiveSelectInput],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[600px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-primary font-medium">Registrar Cliente</h1>
                    @if (errorMessage().length > 0 || successMessage().length > 0) {
                        @if (errorMessage().length > 0) {
                            <app-error-alert [message]="errorMessage()"/>
                        }
                        @if (successMessage().length > 0) {
                            <app-success-alert [message]="successMessage()"/>
                        }
                    }
                </div>
                <div>
                    <form (ngSubmit)="onSubmitHandler()" [formGroup]="formGroup" class="flex flex-col gap-6">
                        <div class="flex flex-col gap-4">
                            <app-reactive-form-input
                            label="Nombre completo"
                            [id]="'client-name'"
                            [control]="formGroup.controls.fullName"
                            [errors]="{ required: 'No puedes dejar este campo vacio' }"
                            />
                            <div class="grid grid-cols-2 gap-2">
                                <app-reactive-select-input
                                label="Tipo de documento"
                                [id]="'client-id-type'"
                                [control]="formGroup.controls.identificationType"
                                [errors]="{ required: 'Debe especificar el tipo' }"
                                >
                                    <option value="V">Venezolano</option>
                                    <option value="G">Gubernamental</option>
                                    <option value="J">Juridico</option>
                                    <option value="E">Extranjero</option>
                                </app-reactive-select-input>
                                    
                                <app-reactive-form-input
                                label="Identificacion"
                                [id]="'client-id'"
                                [control]="formGroup.controls.identification"
                                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                                />
                            </div>
                            <app-reactive-form-input
                            label="Correo electronico"
                            [id]="'client-email'"
                            [control]="formGroup.controls.email"
                            [errors]="{ required: 'No puedes dejar este campo vacio', email: 'Debe ingresar un correo valido' }"
                            />
                        </div>
                        <div>
                            <button [disabled]="loading()" class="btn w-full">
                                @if(loading()) {
                                    <app-loader/>
                                } @else {
                                    Registrar
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </app-custom-dialog>
    `
})
export default class SaveClientModal {


    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);

    public dialogId = input.required<string>();


    public formGroup = new FormGroup({
        fullName: new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required, Validators.email]),
        identification: new FormControl("",[Validators.required]),
        identificationType: new FormControl("V",[Validators.required]),
    });

    constructor(

        private readonly service: ClientsService,
        @Inject(ApiClientRepository)
        private readonly repository: ClientRepository
    ) {}

    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: SaveClient = {
                fullName: data.fullName!,
                email: data.email!,
                identification: data.identification!,
                identificationType: data.identificationType!,
            }
            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Registrado correctamente");
                        this.formGroup.reset();
                        this.service.refreshPage();
                        return;
                    }
                    this.errorMessage.set(result);    
                }, 1000);
            })  
        }
    }
}