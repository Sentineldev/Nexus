import { Component, Inject, input, OnInit, signal } from "@angular/core";
import FeedStockPageService from "../feed-stock.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveFeedStockDto } from "../../../shared/interfaces/types/feed-stock.type";
import FeedStockRepository from "../../../shared/interfaces/feed-stock-repository.interface";
import ApiFeedStockRepository from "../../../shared/repositories/api/api-feed-stock-repository";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import { Loader } from "../../../shared/loader/loader";
import FeedStock from "../classes/feed-stock.class";
import ReactiveFormInput from "../../../shared/forms/reactive-input";
import ReactiveSelectInput from "../../../shared/forms/reactive-select-input";

@Component({
    selector: `app-update-feed-stock-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-primary">Modificar Ingrediente</h1>
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
                            [id]="'name-'+feedStock().id"
                            [control]="formGroup.controls.name"
                            [errors]="{ required: 'No puedes dejar este campo vacio' }"
                            />
                            <app-reactive-select-input
                            label="Unidad"
                            [id]="'unit-'+feedStock().id"
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
                                    Modificar
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [ReactiveFormsModule, CustomDialog, ErrorAlert, SuccessAlert, Loader, ReactiveFormInput, ReactiveSelectInput]
})

export default class UpdateFeedStockModal implements OnInit {
    public dialogId  = input.required<string>();

    public feedStock = input.required<FeedStock>();

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
    ngOnInit(): void {
        this.formGroup.setValue({
            name: this.feedStock().name,
            unit: this.feedStock().unit,
        })
    }


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const value = this.formGroup.value;

            const body: SaveFeedStockDto = {
                name: value.name!,
                unit: value.unit!,
            };

            this.loading.set(true);
            this.repository.update(this.feedStock().id, body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.service.refresh();
                        this.successMessage.set("Actualizado correctamente");
                        return;
                    }
                    this.errorMessage.set(result);

                }, 1000);
            })
        }
    }
}