import { Component, OnInit, input, signal, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../components/alerts/error-alert";
import { Loader } from "../../../components/loader/loader";
import ApiRestaurantRepository from "../../../core/api/restaurant-api.repository";
import Restaurant from "../../../core/classes/restaurant.class";
import RestaurantRepository, { UpdateRestaurant } from "../../../core/interfaces/restaurant-repository.interface";
import ReactiveFormInput from "../../../components/forms/reactive-input";
import { IsActiveValues } from "../../../core/types/globa";

@Component({
    selector: `app-restaurant-update-form`,
    template: `
    @if (errorMessage().length > 0) {
        <div class="py-4">
            <app-error-alert [message]="errorMessage()"/>
        </div>
    }
    <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="flex flex-col gap-6">
        <label for="is_active" class="flex items-center gap-2  text-wrap ">
            <input formControlName="isActive" class="h-6 w-6 accent-primary" type="checkbox" name="is_active" id="is_active">
            <p class="font-sans text-lg text-black font-medium">Habilitar / Deshabilitar</p>
        </label>    
        <app-reactive-form-input
        [control]="formGroup.controls.name"
        [id]="'name'"
        label="Nombre"
        [errors]="{  required: 'No puedes dejar este campo vacio' }"
        />
        <div class="w-fit">
            <button [disabled]="loading()" type="submit" class="btn">
                @if (loading()) {
                    <app-loader/>
                } @else {
                    Actualizar
                }
            </button>
        </div>
    </form>
    
   
    `,
    imports: [ReactiveFormsModule, Loader, ErrorAlert, ReactiveFormInput]
})
export default class RestaurantUpdateForm implements OnInit {

    public restaurant = input.required<Restaurant>();

    public loading = signal(false);
    public errorMessage = signal("");

    public formGroup = new FormGroup({
        name: new FormControl("",[Validators.required]),
        isActive: new FormControl<boolean>(false),
    })  



    constructor(
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository
    ) {}

    ngOnInit(): void {
        this.formGroup.setValue({
            name: this.restaurant().name,
            isActive: this.restaurant().isActive,
        })
    }

    onSubmitHandler() {

        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            
            const body: UpdateRestaurant = {
                name: data.name!,
                isActive: JSON.stringify(data.isActive!) as IsActiveValues,
            };

            this.loading.set(true);
            this.repository.update(this.restaurant().id, body).subscribe((result) => {
                setTimeout(() => {
                    if (result.length === 0) {
                        window.location.reload();
                        return;
                    }
                    this.loading.set(false);
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }


}