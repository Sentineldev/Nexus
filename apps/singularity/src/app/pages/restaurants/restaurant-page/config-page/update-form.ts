import { Component, Inject, input, OnInit, signal } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import RestaurantRepository from "../../interfaces/restaurant-repository.interface";
import { UpdateRestaurant } from "../../dto/restaurant.dto";
import { Loader } from "../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import ApiRestaurantRepository from "../../../../shared/repositories/api/restaurant-api.repository";

@Component({
    selector: `app-restaurant-update-form`,
    template: `
    
    <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="flex flex-col gap-6">
        <label for="is_active" class="flex items-center gap-2  text-wrap ">
            <input formControlName="isActive" class="h-6 w-6" type="checkbox" name="is_active" id="is_active">
            <p class="font-sans text-lg text-slate-700">Habilitar / Deshabilitar</p>
        </label>    
        <label for="name">
            <input formControlName="name" class="border-b border-slate-700 font-sans text-lg w-full outline-hidden py-2" type="text" name="name" id="name" placeholder="Nombre">
        </label>
        <div>
            <button [disabled]="loading()" type="submit" class="bg-slate-700 text-white font-sans text-lg rounded-lg p-3 px-6">
                @if (loading()) {
                    <app-loader/>
                } @else {
                    Actualizar
                }
            </button>
        </div>
    </form>
    @if (errorMessage().length > 0) {
        <div class="py-4">
            <app-error-alert [message]="errorMessage()"/>
        </div>
    }
   
    `,
    imports: [ReactiveFormsModule, Loader, ErrorAlert]
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
                isActive: data.isActive!,
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