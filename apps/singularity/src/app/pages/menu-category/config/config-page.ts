import { Component, computed } from "@angular/core";
import UpdateMenuCategoryForm from "./update-form";
import MenuCategoryPageService2 from "../menu-category-page.service";

@Component({
    selector: `app-menu-category-config-page`,
    template: `
    <div class="p-12">
        <app-update-menu-category-form [category]="category()"/>
    </div>
    `,
    imports: [UpdateMenuCategoryForm],
})
export default class MenuCategoryConfigPage {



    public category = computed(() => this.menuCategoryService.getCategory());

    constructor(
        private readonly menuCategoryService: MenuCategoryPageService2
    ) {}
}