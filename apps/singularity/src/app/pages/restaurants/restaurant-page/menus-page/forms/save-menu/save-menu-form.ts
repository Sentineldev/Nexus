import { Component, computed, EventEmitter, Inject, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenu } from "../../../../dto/menu.dto";
import RestaurantPageService from "../../../restaurant-page.service";
import MenuRepository from "../../../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../../repositories/menu-api.repository";
import { Loader } from "../../../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../../../shared/alerts/error-alert";

@Component({
    selector: `app-save-menu-form`,
    templateUrl: `./save-menu-form.html`,
    imports: [ReactiveFormsModule, Loader, ErrorAlert]
})
export default class SaveMenuForm {
    

    @Output() newMenuEvent = new EventEmitter();

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });

    public loading = signal(false);
    public errorMessage = signal("");

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

            this.loading.set(true);
            this.errorMessage.set("");

            this.menuRepository.save(newMenu).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.newMenuEvent.emit();
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            });
        }
    }
}