import { Component, EventEmitter, Inject, input, Output } from "@angular/core";
import Menu from "../../../../classes/menu.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenuCategory } from "../../../../dto/menu-category.dto";
import MenuCategoryRepository from "../../../../interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../../repositories/menu-category-api.repository";

@Component({
    selector: `app-save-menu-category`,
    templateUrl: "./save-menu-category-form.html",
    imports: [ReactiveFormsModule],
})
export default class SaveMenuCategoryForm {

    public menu = input.required<Menu>();

    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();


    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required])
    });


    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly categoriesRepository: MenuCategoryRepository
    ) {}


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const newCategory: SaveMenuCategory = {
                name: data.name!,
                menuId: this.menu().id
            };
            this.categoriesRepository.save(newCategory).subscribe((result) => {

                if (result.length === 0) {
                    this.formGroup.reset();
                    this.newCategoryEvent.emit(newCategory);
                }
            })
            
        }
    }

}