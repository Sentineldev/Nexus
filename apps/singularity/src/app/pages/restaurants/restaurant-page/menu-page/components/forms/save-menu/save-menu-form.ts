import { Component, computed, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenu } from "../../../../../dto/menu.dto";
import RestaurantPageService from "../../../../restaurant-page.service";

@Component({
    selector: `app-save-menu-form`,
    templateUrl: `./save-menu-form.html`,
    imports: [ReactiveFormsModule]
})
export default class SaveMenuForm {
    

    @Output() newMenuEvent = new EventEmitter<SaveMenu>();

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });

    public restaurant = computed(() => this.service.getRestaurant());
    constructor(
        private readonly service: RestaurantPageService,
    ) {} 

    onSubmitHandler() {

        if (this.formGroup.valid) {
            const data = this.formGroup.value;
            const newMenu: SaveMenu = {
                name: data.name!,
                restaurantId: this.restaurant().id
            };
            this.newMenuEvent.emit(newMenu);
            this.formGroup.reset();
        }
    }
}