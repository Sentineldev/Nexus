import { Component, computed, Inject, input, signal } from "@angular/core";
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

@Component({
    selector: `app-update-feed-stock-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-slate-700">Modificar Ingrediente</h1>
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
                    <form (ngSubmit)="onSubmitHandler()" [formGroup]="formGroup()" class="flex flex-col gap-6">
                        <div class="flex flex-col gap-4">
                            <div>
                                <label for="name" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Nombre</p>
                                    <input autocomplete="on" formControlName="name" type="text" name="name" id="name" class="border rounded p-1">
                                </label>
                                @if (formGroup().dirty && formGroup().controls.name.dirty && formGroup().controls.name.getError("required")) {
                                    <p class="text-red-500">Ingrese el nombre</p>
                                }
                            </div>
                            <div>
                                <label for="identificationType" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Tipo</p>
                                    <select formControlName="unit" class="border p-1 text-lg rounded" name="unit" id="unit">
                                        <option selected value="">Selecciona una unidad</option>    
                                        <option value="KG">Kilos</option>
                                        <option value="LT">Litros</option>
                                        <option value="GR">Gramos</option>
                                    </select>
                                </label>
                                @if (formGroup().dirty && formGroup().controls.unit.dirty && formGroup().controls.unit.getError("required")) {
                                    <p class="text-red-500">Ingrese la unidad</p>
                                }
                            </div>
                        </div>
                        <div>
                            <button [disabled]="loading()" class="bg-slate-700  text-white w-full p-2 rounded-lg font-sans text-[1.1rem]">
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
    imports: [ReactiveFormsModule, CustomDialog, ErrorAlert, SuccessAlert, Loader]
})

export default class UpdateFeedStockModal {
    public dialogId  = input.required<string>();

    public feedStock = input.required<FeedStock>();

    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);


    public formGroup = computed(() => {
        return new FormGroup({
            name: new FormControl<string>(this.feedStock().name,[Validators.required]),
            unit: new FormControl<string>(this.feedStock().unit,[Validators.required]),
        });
    })



    constructor(
        private readonly service: FeedStockPageService,
        @Inject(ApiFeedStockRepository)
        private readonly repository: FeedStockRepository
    ) {}


    onSubmitHandler() {
        if (this.formGroup().valid) {

            const value = this.formGroup().value;

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