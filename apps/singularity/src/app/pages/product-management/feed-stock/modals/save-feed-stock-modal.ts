import { Component, Inject, input, signal } from "@angular/core";
import FeedStockPageService from "../feed-stock.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Loader } from "../../../../components/loader/loader";
import ReactiveSelectInput from "../../../../components/forms/reactive-select-input";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import FeedStockRepository, { SaveFeedStockDto } from "../../../../core/interfaces/feed-stock-repository.interface";
import ApiFeedStockRepository from "../../../../core/api/api-feed-stock-repository";

@Component({
    selector: `app-save-feed-stock-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-primary">Crear Ingrediente</h1>
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
                            label="Nombre"
                            [control]="formGroup.controls.name"
                            [id]="'name'"
                            [errors]="{ required: 'No puedes dejar este campo vacio' }"
                            />
                            <app-reactive-select-input
                            label="Unidad"
                            [id]="'unit'"
                            [control]="formGroup.controls.unit"
                            [errors]="{ required: 'Selecciona una unidad' }"
                            >
                                <option selected value="">Selecciona una unidad</option>    
                                <option value="KG">Kilos</option>
                                <option value="LT">Litros</option>
                                <option value="GR">Gramos</option>
                            </app-reactive-select-input>
                        </div>
                        <div>
                            <button [disabled]="loading()" class="btn w-full">
                                @if(loading()) {
                                    <app-loader/>
                                } @else {
                                    Crear
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [ReactiveFormsModule, Loader, ReactiveSelectInput, ReactiveFormInput, SuccessAlert, ErrorAlert, CustomDialog]
})

export default class SaveFeedStockModal {
    public dialogId  = input.required<string>();

    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);


    public formGroup = new FormGroup({
        name: new FormControl<string>("",[Validators.required]),
        unit: new FormControl<string>("",[Validators.required]),
    });



    constructor(
        private readonly service: FeedStockPageService,
        @Inject(ApiFeedStockRepository)
        private readonly repository: FeedStockRepository
    ) {}


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const value = this.formGroup.value;

            const body: SaveFeedStockDto = {
                name: value.name!,
                unit: value.unit!,
            };

            this.loading.set(true);
            this.repository.save(body).subscribe((result) => {

                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.service.refresh();
                        this.successMessage.set("Creado correctamente");
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);

                }, 1000);
            })
        }
    }
}