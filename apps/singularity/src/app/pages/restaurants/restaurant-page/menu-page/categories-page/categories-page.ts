import { Component, computed, OnInit } from "@angular/core";
import MenuPageService from "../menu-page.service";
import CategoriesDisplay from "../display/categories";
import SaveMenuCategoryForm from "../../menus-page/forms/save-menu-category/save-menu-category-form";
import CategoriesPageService from "./categories-page.service";

@Component({
    selector: `app-categories-page`,
    template: `
    <div class="p-4">
        <app-save-menu-category (newCategoryEvent)="newCategoryHandler()" [menu]="menu()"/>
    </div>
    <div class="">
        <app-categories-display [categories]="state().categories"/>
    </div>
    
    `,
    imports: [CategoriesDisplay, SaveMenuCategoryForm]
})
export default class CategoriesPage implements OnInit {




    public menu = computed(() => this.menuPageService.getMenu());

    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: CategoriesPageService,
        private readonly menuPageService: MenuPageService
    ) {}
    ngOnInit(): void {
        this.newCategoryHandler();
    }
    newCategoryHandler() {
        this.service.getAll(this.menu().id);
    } 

}