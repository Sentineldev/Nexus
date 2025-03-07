import { Component, EventEmitter, Inject, input, OnInit, Output, signal } from "@angular/core";
import Client from "../classes/client.class";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import ClientRepository from "../../../shared/interfaces/client-repository.interface";
import ApiClientRepository from "../../../shared/repositories/api/api-client-repository";
import { SaveClient } from "../dto/client.dto";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import { Loader } from "../../../shared/loader/loader";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import ClientsService from "../client.service";
import ReactiveFormInput from "../../../shared/forms/reactive-input";
import ReactiveSelectInput from "../../../shared/forms/reactive-select-input";

@Component({
    selector: `app-update-client-modal`,
    imports: [CustomDialog, ErrorAlert, SuccessAlert, Loader, DialogToggler, ReactiveFormsModule, ReactiveFormInput, ReactiveSelectInput],
    template: `
    <div>
        <app-custom-dialog [dialogId]="dialogId()">
            <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[600px]">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-4">
                        <h1 class="text-center text-[1.2rem] font-sans text-primary font-medium">Actualizar Cliente</h1>
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
                                [id]="'client-name-'+client().id"
                                [control]="formGroup.controls.fullName"
                                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                                />
                                <div class="grid grid-cols-2 gap-2">
                                    <app-reactive-select-input
                                    label="Tipo de documento"
                                    [id]="'client-id-type-'+client().id"
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
                                    [id]="'client-id-'+client().id"
                                    [control]="formGroup.controls.identification"
                                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                                    />
                                </div>
                                <app-reactive-form-input
                                label="Correo electronico"
                                [id]="'client-email-'+client().id"
                                [control]="formGroup.controls.email"
                                [errors]="{ required: 'No puedes dejar este campo vacio', email: 'Debe ingresar un correo valido' }"
                                />
                            </div>
                            <div>
                                <button [disabled]="loading()" class="btn w-full">
                                    @if(loading()) {
                                        <app-loader/>
                                    } @else {
                                        Actualizar
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </app-custom-dialog>
        <app-dialog-toggler [dialogId]="dialogId()">
            <div class="btn">
                <img class="" src="./svg/edit-svgrepo-com.svg" alt="trash-icon" width="24" height="24">
            </div>
        </app-dialog-toggler>
    </div>
    `
})
export default class UpdateClientModal implements OnInit {

    public client = input.required<Client>();
    public dialogId = input.required<string>();

    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);
    @Output() onUpdate = new EventEmitter();


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
    ngOnInit(): void {
        this.formGroup.setValue({
            email: this.client().email,
            fullName: this.client().fullName,
            identification: this.client().identification,
            identificationType: this.client().identificationType
        })
    }

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
            this.repository.update(this.client().id, body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Actualizado correctamente");
                        this.service.refreshPage();
                        return;
                    }
                    this.errorMessage.set(result);    
                }, 1000);
            })  
        }
    }
}