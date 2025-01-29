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

@Component({
    selector: `app-update-client-modal`,
    imports: [CustomDialog, ErrorAlert, SuccessAlert, Loader, DialogToggler, ReactiveFormsModule],
    template: `
    <div>
        <app-custom-dialog [dialogId]="dialogId()">
            <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[380px]">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-4">
                        <h1 class="text-center text-[1.2rem] font-sans text-slate-700">Actualizar Cliente</h1>
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
                                <div>
                                    <label for="fullName" class="flex flex-col gap-1">
                                        <p class="text-slate-700">Nombre</p>
                                        <input autocomplete="on" formControlName="fullName" type="text" name="fullName" id="fullName" class="border rounded p-1">
                                    </label>
                                    @if (formGroup.dirty && formGroup.controls.fullName.dirty && formGroup.controls.fullName.getError("required")) {
                                        <p class="text-red-500">Ingrese el nombre</p>
                                    }
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label for="identificationType" class="flex flex-col gap-1">
                                            <p class="text-slate-700">Tipo</p>
                                            <!-- <input autocomplete="on" formControlName="identificationType" type="text" name="name" id="name" class="border rounded p-1"> -->
                                            <select formControlName="identificationType" class="border p-1 text-lg rounded" name="identificationType" id="identificationType">
                                                <option value="V">Venezolano</option>
                                                <option value="G">Gubernamental</option>
                                                <option value="J">Juridico</option>
                                                <option value="E">Extranjero</option>
                                            </select>
                                        </label>
                                        @if (formGroup.dirty && formGroup.controls.identificationType.dirty && formGroup.controls.identificationType.getError("required")) {
                                            <p class="text-red-500">Ingrese</p>
                                        }
                                    </div>
                                    <div>
                                        <label for="identification" class="flex flex-col gap-1">
                                            <p class="text-slate-700">Identificacion</p>
                                            <input autocomplete="on" formControlName="identification" type="text" name="identification" id="identification" class="border rounded p-1">
                                        </label>
                                        @if (formGroup.dirty && formGroup.controls.identification.dirty && formGroup.controls.identification.getError("required")) {
                                            <p class="text-red-500">Ingrese la identificacion</p>
                                        }
                                    </div>
                                </div>
                            </div>
                                <div>
                                    <label for="email" class="flex flex-col gap-1">
                                        <p class="text-slate-700">Email</p>
                                        <input autocomplete="on" formControlName="email" type="text" name="email" id="email" class="border rounded p-1">
                                    </label>
                                    @if (formGroup.dirty && formGroup.controls.email.dirty && formGroup.controls.email.getError("required")) {
                                        <p class="text-red-500">Ingrese una direccion de correo valida</p>
                                    }
                                </div>
                            <div>
                                <button [disabled]="loading()" class="bg-slate-700  text-white w-full p-2 rounded-lg font-sans text-[1.1rem]">
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
            <h1 class="text-slate-700 text-[1rem]">
                <img class="" src="./svg/edit-svgrepo-com.svg" alt="trash-icon" width="32" height="32">
            </h1>
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