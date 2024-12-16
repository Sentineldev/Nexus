import { Component, EventEmitter, Inject, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveRestaurant } from "../../dto/restaurant.dto";
import RestaurantRepository from "../../interfaces/restaurant-repository.interface";
import ApiRestaurantRepository from "../../repositories/restaurant-api.repository";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import { Loader } from "../../../../shared/loader/loader";

@Component({
    selector: 'app-save-restaurant-form',
    imports: [ReactiveFormsModule, ErrorAlert, Loader],
    templateUrl: './save-restaurant-form.html',
})
export default class SaveRestaurantForm {  


    @Output() newRestaurantEvent = new EventEmitter();


    public errorMessage = signal("");
    public loading = signal(false);

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });


    constructor(
        @Inject(ApiRestaurantRepository)
        private readonly repository: RestaurantRepository
    ) {}

    async onSubmitHandler() {

        if (this.formGroup.valid) {

            const formFields = this.formGroup.value;

            const data: SaveRestaurant = {
                name: formFields.name!
            }  

            this.loading.set(true);
            this.errorMessage.set("");
            this.repository.save(data).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                if (result.length === 0) {
                    this.formGroup.reset();
                    this.newRestaurantEvent.emit()
                    return;
                }
                this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}
  