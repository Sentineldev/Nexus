import { Component, computed, OnInit } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import MenuPageService from "./menu-page.service";
import { ActivatedRoute } from "@angular/router";
import SaveMenuCategoryForm from "../menus-page/forms/save-menu-category/save-menu-category-form";
import CategoriesDisplay from "./display/categories";

@Component({
    selector: `app-menu-page-2`,
    template: `

    @if (state().menu) {
        <div class="py-4 px-1 flex flex-col gap-4">
            <h1 class="text-[2rem] font-sans text-slate-500 font-bold">{{state().menu!.name}}</h1>
            <app-save-menu-category [menu]="state().menu!"/>
            <app-categories-display [categories]="state().menu!.categories"/>
        </div>
    }
    
    `,
    imports: [SaveMenuCategoryForm, CategoriesDisplay]
})
export default class MenuPage implements OnInit {



    public state = computed(() => this.menuPageService.getState());

    constructor(
        private readonly menuPageService: MenuPageService,
        private readonly routes: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        const menuId  = this.routes.snapshot.paramMap.get("menuId");

        if (menuId) {
            this.menuPageService.getById(menuId);
        }
    }

}