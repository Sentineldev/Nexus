import { Component, computed } from "@angular/core";
import MenuPageService from "../menu-page.service";
import CategoriesDisplay from "../display/categories";
import SaveMenuCategoryForm from "../../menus-page/forms/save-menu-category/save-menu-category-form";

@Component({
    selector: `app-categories-page`,
    template: `
    <div class="p-4">
        <app-save-menu-category [menu]="menu()"/>
    </div>
    <div class="">
        <app-categories-display [categories]="menu().categories"/>
    </div>
    
    `,
    imports: [CategoriesDisplay, SaveMenuCategoryForm]
})
export default class CategoriesPage {




    public menu = computed(() => this.menuPageService.getMenu());


    constructor(
        private readonly menuPageService: MenuPageService
    ) {}

}