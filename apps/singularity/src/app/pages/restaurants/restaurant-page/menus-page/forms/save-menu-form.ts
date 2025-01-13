import { Component, computed, EventEmitter, Inject, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { Loader } from "../../../../../shared/loader/loader";
import { SaveMenu } from "../../../dto/menu.dto";
import MenuRepository from "../../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../../../shared/repositories/api/menu-api.repository";
import RestaurantPageService from "../../restaurant-page.service";
import MenusPageService from "../menus-page.service";


@Component({
    selector: `app-save-menu-form`,
    templateUrl: `./save-menu-form.html`,
    imports: [ReactiveFormsModule, Loader, ErrorAlert]
})
export default class SaveMenuForm {
    

    public formGroup = new FormGroup({
        name: new FormControl('',[Validators.required])
    });

    public loading = signal(false);
    public errorMessage = signal("");

    public restaurant = computed(() => this.service.getRestaurant());
    constructor(
        private readonly service: RestaurantPageService,
        private readonly menusPageService: MenusPageService,
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
                        this.formGroup.reset();
                        this.menusPageService.refreshMenus();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            });
        }
    }
}