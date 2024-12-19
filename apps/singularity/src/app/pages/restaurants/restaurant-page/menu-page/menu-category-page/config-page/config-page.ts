import { Component, computed } from "@angular/core";
import MenuCategoryPageService from "../menu-category-page.service";
import UpdateMenuCategoryForm from "./update-form";

@Component({
    selector: `app-menu-category-config-page`,
    template: `
    <div class="py-4">
        <app-update-menu-category-form [category]="category()"/>
    </div>
    `,
    imports: [UpdateMenuCategoryForm],
})
export default class MenuCategoryConfigPage {



    public category = computed(() => this.menuCategoryService.getCategory());

    constructor(
        private readonly menuCategoryService: MenuCategoryPageService
    ) {}
}