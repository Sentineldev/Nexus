import { Component, computed, OnInit } from "@angular/core";
import MenuPageService from "../menu-page.service";
import CategoriesDisplay from "./display/categories";
import SaveMenuCategoryForm from "./save-menu-category/save-menu-category-form";
import CategoriesPageService from "./categories-page.service";
import { Loader } from "../../../../../shared/loader/loader";

@Component({
    selector: `app-categories-page`,
    template: `
    <div class="flex flex-col">
        <div class="p-2">
            <app-save-menu-category [menu]="menu()"/>
        </div>
        @if (state().loading) {
            <div class="px-4">
                <app-loader [color]="'secondary'"/>
            </div>
        } @else {
            <div>
                <app-categories-display [categories]="state().categories"/>
            </div>
        }
    </div>
    
    
    `,
    imports: [CategoriesDisplay, SaveMenuCategoryForm, Loader]
})
export default class CategoriesPage implements OnInit {




    public menu = computed(() => this.menuPageService.getMenu());

    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: CategoriesPageService,
        private readonly menuPageService: MenuPageService
    ) {}
    ngOnInit(): void {
        this.service.getAll();
    }

}