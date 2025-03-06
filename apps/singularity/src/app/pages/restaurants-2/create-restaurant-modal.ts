import { Component, Inject, input, signal } from "@angular/core";
import CustomDialog from "../../shared/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import ReactiveFormInput from "../../shared/forms/reactive-input";
import RestaurantsPageService from "./restaurants-page.service";
import RestaurantRepository from "../restaurants/interfaces/restaurant-repository.interface";
import ApiRestaurantRepository from "../../shared/repositories/api/restaurant-api.repository";
import { SaveRestaurant } from "../restaurants/dto/restaurant.dto";
import { ErrorAlert } from "../../shared/alerts/error-alert";
import { SuccessAlert } from "../../shared/alerts/success-alert";
import { Loader } from "../../shared/loader/loader";

@Component({
    selector: `app-create-restaurant-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-black font-medium text-center text-xl">Crear Restaurante</h1>
            </div>

            @if (errorMessage().length > 0 || successMessage().length > 0) {
                <div>
                    @if (errorMessage().length > 0) {
                        <app-error-alert [message]="errorMessage()"/>
                    }
                    @if (successMessage().length > 0) {
                        <app-success-alert [message]="successMessage()"/>
                    }
                </div>
            }
            <form (ngSubmit)="onSubmitHandler()" [formGroup]="form" class="flex flex-col gap-6">
                <div>
                    <app-reactive-form-input
                    label="Nombre"
                    [id]="'name'"
                    [control]="form.controls.name"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button type="submit" [disabled]="loading()" class="btn">
                        @if (!loading()) {
                            Crear
                        } @else {
                            <app-loader color="secondary"/>
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule, ReactiveFormInput, ErrorAlert, SuccessAlert, Loader]
})
export default class CreateRestaurantModal {

    public dialogId = input.required<string>();

    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");
    public loading = signal<boolean>(false);

    public form = new FormGroup({
        name: new FormControl<string>("",[Validators.required])
    });

    constructor(
        private readonly service: RestaurantsPageService,
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository,
    ) {}


    onSubmitHandler() {

        if (this.form.valid) {
            this.errorMessage.set("");
            this.successMessage.set("");
            const value = this.form.value;
            const body: SaveRestaurant = {
                name: value.name!
            };

            this.loading.set(true);
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.form.reset();
                        this.successMessage.set("Creado correctamente");
                        this.service.fetch();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            });
        }
    }
}