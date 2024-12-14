import { Component, computed, EventEmitter, Inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenu } from "../../../../dto/menu.dto";
import RestaurantPageService from "../../../restaurant-page.service";
import MenuRepository from "../../../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../../repositories/menu-api.repository";

@Component({
    selector: `app-save-menu-form`,
    templateUrl: `./save-menu-form.html`,
    imports: [ReactiveFormsModule]
})
export default class SaveMenuForm {
    

    @Output() newMenuEvent = new EventEmitter();

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });

    public restaurant = computed(() => this.service.getRestaurant());
    constructor(
        private readonly service: RestaurantPageService,
        @Inject(ApiMenuRepository)
        private readonly menuRepository: MenuRepository
    ) {} 

    onSubmitHandler() {
        if (this.formGroup.valid) {
            const data = this.formGroup.value;
            const newMenu: SaveMenu = {
                name: data.name!,
                restaurantId: this.restaurant()!.id
            };
            this.menuRepository.save(newMenu).subscribe((result) => {
                if (result.length === 0) {
                    this.newMenuEvent.emit();
                    this.formGroup.reset();
                }
            });
        }
    }
}