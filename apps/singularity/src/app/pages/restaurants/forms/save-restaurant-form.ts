import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveRestaurant } from "../dto/restaurant.dto";

@Component({
    selector: 'app-save-restaurant-form',
    imports: [ReactiveFormsModule],
    templateUrl: './save-restaurant-form.html',
})
export default class SaveRestaurantForm {  


    @Output() newRestaurantEvent = new EventEmitter<SaveRestaurant>();

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });


    async onSubmitHandler() {

        if (this.formGroup.valid) {

            const formFields = this.formGroup.value;

            const data: SaveRestaurant = {
                name: formFields.name!
            }
            this.formGroup.reset();
            this.newRestaurantEvent.emit(data)
        }
    }
}
  