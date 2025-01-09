import { Component, EventEmitter, Inject, input, Output, signal } from "@angular/core";
import Menu from "../../../../classes/menu.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenuCategory } from "../../../../dto/menu-category.dto";
import MenuCategoryRepository from "../../../../interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../../repositories/menu-category-api.repository";
import { Loader } from "../../../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../../../shared/alerts/error-alert";
import CategoriesPageService from "../categories-page.service";

@Component({
    selector: `app-save-menu-category`,
    templateUrl: "./save-menu-category-form.html",
    imports: [ReactiveFormsModule, Loader, ErrorAlert],
})
export default class SaveMenuCategoryForm {

    public menu = input.required<Menu>();


    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    public loading = signal(false);
    public errorMessage = signal("");

    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly categoriesRepository: MenuCategoryRepository,
        private readonly service: CategoriesPageService,
    ) {}


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const newCategory: SaveMenuCategory = {
                name: data.name!,
                menuId: this.menu().id
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.categoriesRepository.save(newCategory).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.formGroup.reset();
                        this.service.getAll();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
            
        }
    }

}