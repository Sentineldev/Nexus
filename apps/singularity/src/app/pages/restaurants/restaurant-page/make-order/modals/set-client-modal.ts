import { Component, Inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import ClientRepository from "../../../../../shared/interfaces/client-repository.interface";
import ApiClientRepository from "../../../../../shared/repositories/api/api-client-repository";
import OrderService from "../order-service";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import DialogUtils from "../../../../../utils/dialog";

@Component({
    selector: `app-set-client-modal`,
    imports: [ReactiveFormsModule, CustomDialog],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-slate-600">Registrar Cliente</h1>
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <label for="identification">
                        <p class="font-sans text-slate-700">Ingresar identificacion</p>
                        <input formControlName="identification" class="border border-slate-300 rounded w-full outline-none p-1" type="tel" name="identification" id="identification"/>
                    </label>
                </div>
                <div>
                    <button class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">Buscar</button>
                </div>
            </form>
            @if (registerClient()) {
                <form [formGroup]="formGroup2" (ngSubmit)="registerClientHandler()" class="w-full flex flex-col gap-6">
                    <div class="flex flex-col gap-4">
                        <label for="name">
                            <p class="font-sans text-slate-700">Nombre</p>
                            <input autofocus="true" formControlName="name" class="border border-slate-300 rounded w-full outline-none p-1" type="text" name="name" id="name"/>
                        </label>
                    </div>
                    <div>
                        <button class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">Registrar</button>
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
                email: "",
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