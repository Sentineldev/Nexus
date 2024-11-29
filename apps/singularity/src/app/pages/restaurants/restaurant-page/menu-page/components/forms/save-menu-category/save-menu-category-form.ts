import { Component, EventEmitter, input, Output } from "@angular/core";
import Menu from "../../../../../classes/menu.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveMenuCategory } from "../../../../../dto/menu-category.dto";

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


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const newCategory: SaveMenuCategory = {
                name: data.name!,
                menuId: this.menu().id
            };
            this.formGroup.reset();
            this.newCategoryEvent.emit(newCategory);
        }
    }

}