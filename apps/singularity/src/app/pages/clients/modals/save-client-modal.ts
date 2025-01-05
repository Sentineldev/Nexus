import { Component, EventEmitter, Inject, input, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import ClientRepository from "../../../shared/interfaces/client-repository.interface";
import ApiClientRepository from "../../../shared/repositories/api-client-repository";
import { SaveClient } from "../dto/client.dto";

@Component({
    selector: `app-save-client-modal`,
    imports: [CustomDialog, DialogToggler, ErrorAlert, SuccessAlert, ReactiveFormsModule],
    template: `
    <div>
        <app-custom-dialog [dialogId]="dialogId">
            <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[380px]">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-4">
                        <h1 class="text-center text-[1.2rem] font-sans text-slate-700">Registrar Cliente</h1>
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
                                    <label [htmlFor]="'fullName'" class="flex flex-col gap-1">
                                        <p class="text-slate-700">Nombre</p>
                                        <input autocomplete="on" formControlName="fullName" type="text" name="name" id="name" class="border rounded p-1">
                                    </label>
                                    @if (formGroup.dirty && formGroup.controls.fullName.dirty && formGroup.controls.fullName.getError("required")) {
                                        <p class="text-red-500">Ingrese el nombre</p>
                                    }
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label [htmlFor]="'identificationType'" class="flex flex-col gap-1">
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
                                        <label [htmlFor]="'name'" class="flex flex-col gap-1">
                                            <p class="text-slate-700">Identificacion</p>
                                            <input autocomplete="on" formControlName="identification" type="text" name="name" id="name" class="border rounded p-1">
                                        </label>
                                        @if (formGroup.dirty && formGroup.controls.identification.dirty && formGroup.controls.identification.getError("required")) {
                                            <p class="text-red-500">Ingrese la identificacion</p>
                                        }
                                    </div>
                                </div>
                            </div>
                                <div>
                                    <label [htmlFor]="'email'" class="flex flex-col gap-1">
                                        <p class="text-slate-700">Email</p>
                                        <input autocomplete="on" formControlName="email" type="text" name="name" id="name" class="border rounded p-1">
                                    </label>
                                    @if (formGroup.dirty && formGroup.controls.email.dirty && formGroup.controls.email.getError("required")) {
                                        <p class="text-red-500">Ingrese una direccion de correo valida</p>
                                    }
                                </div>
                            <div>
                                <button [disabled]="loading()" class="bg-slate-700  text-white w-full p-2 rounded-lg font-sans text-[1.1rem]">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </app-custom-dialog>
        <app-dialog-toggler [dialogId]="dialogId">
            <div class="bg-slate-700 border-none text-white p-3 rounded-lg transition-all hover:opacity-90 outline-none">
                <h1>Registrar Cliente</h1>
            </div>
        </app-dialog-toggler>
    </div>
    `
})
export default class SaveClientModal {


    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);
    public dialogId = `save-product-modal`;
    @Output() onUpdate = new EventEmitter();


    public formGroup = new FormGroup({
        fullName: new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required, Validators.email]),
        identification: new FormControl("",[Validators.required]),
        identificationType: new FormControl("V",[Validators.required]),
    });

    constructor(
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
            this.repository.Save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Registrado correctamente");
                        this.onUpdate.emit();
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);    
                }, 1000);
            })  
        }
    }
}