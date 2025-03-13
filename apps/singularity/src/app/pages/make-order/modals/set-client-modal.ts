import { Component, Inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import ClientRepository from "../../../core/interfaces/client-repository.interface";
import ApiClientRepository from "../../../core/api/api-client-repository";
import OrderService from "../order-service";
import CustomDialog from "../../../components/dialog/custom-dialog";
import DialogUtils from "../../../utils/dialog";
import ReactiveFormInput from "../../../components/forms/reactive-input";

@Component({
    selector: `app-set-client-modal`,
    imports: [ReactiveFormsModule, CustomDialog, ReactiveFormInput],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-medium text-primary">Registrar Cliente</h1>
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <app-reactive-form-input
                    label="Identificacion"
                    [id]="'identification'"
                    [control]="formGroup.controls.identification"
                    [errors]="{ required: 'Debes ingresar la identificacion' }"
                    />
                </div>
                <div>
                    <button class="btn w-full" type="submit">Buscar</button>
                </div>
            </form>
            @if (registerClient()) {
                <form [formGroup]="formGroup2" (ngSubmit)="registerClientHandler()" class="w-full flex flex-col gap-6">
                    <div class="flex flex-col gap-4">
                        <app-reactive-form-input
                        label="Nombre"
                        [id]="'client_name'"
                        [control]="formGroup2.controls.name"
                        [errors]="{ required: 'Debes ingresar el nombre' }"
                        />
                    </div>
                    <div>
                        <button class="btn w-full" type="submit">Registrar</button>
                    </div>
                </form>
            }
        </div>
    </app-custom-dialog>
    `
})
export default class SetClientModal {

    public dialogId  = signal<string>("save-client-modal");

    public registerClient = signal<boolean>(false);

    public formGroup = new FormGroup({
        identification: new FormControl("", [Validators.required]),
        identificationType: new FormControl("V", [Validators.required])
    });

    public formGroup2 = new FormGroup({
        name: new FormControl("", [Validators.required]),
    });
    
    constructor(
        private readonly service: OrderService,
        @Inject(ApiClientRepository)
        private readonly clientRepository: ClientRepository
    ) {}
    

    registerClientHandler() {

        if (this.formGroup2.valid && this.formGroup.valid) {
            const value = this.formGroup.value;
            const value2 = this.formGroup2.value;

            const body = {
                identification: value.identification!,
                identificationType: value.identificationType!,
                name: value2.name!,
            };

            this.clientRepository.save({
                email: "email@mail.com",
                fullName: body.name,
                identification: body.identification,
                identificationType: body.identificationType,
            }).subscribe((result) => {

                if (result.length === 0) {

                    this.service.setClient({
                        name: body.name,
                        identification: body.identification,
                        identificationType: body.identificationType,
                    });
                    DialogUtils.CloseModal(this.dialogId());
                    return;
                }
            })
        }
    }
    onSubmitHandler() {

        if (this.formGroup.valid) {

            const value = this.formGroup.value;

            const body = {
                identification: value.identification!,
                identificationType: value.identificationType!,
            };

            this.clientRepository.getByIdentification(body.identification).subscribe((result) =>{
                if (result.status === 200) {
                    const client = result.body;
                    this.service.setClient({
                        identification: client.identification,
                        identificationType: client.identificationType,
                        name: client.fullName,
                    });
                    DialogUtils.CloseModal(this.dialogId());
                    return;
                }
                if(result.status === 404) {
                    this.registerClient.set(true);
                    return;
                }
            })
        }
    }
}