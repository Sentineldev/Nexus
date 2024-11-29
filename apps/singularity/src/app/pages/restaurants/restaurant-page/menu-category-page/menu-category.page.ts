import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";

@Component({
    selector: `app-menu-category-page`,
    imports: [RouterOutlet, ErrorAlert],
    template: `
    
    @if (!state().loading && state().error.length === 0) {
        <router-outlet/>
    }
    @if (!state().loading && state().error) {
        <app-error-alert [message]="state().error"/>
    }
    
    `
})
export default class MenuCategoryPage implements OnInit {


    public state = computed(() => {
        return this.service.getState2();
    })
    constructor(
        private readonly route: ActivatedRoute,
        private readonly service: MenuCategoryPageService,
    ) {}

    ngOnInit(): void {

        const menuId = this.route.snapshot.paramMap.get('menuId');
        const categoryId = this.route.snapshot.paramMap.get('categoryId');
    
        if (menuId && categoryId) {
            this.service.getById(menuId, categoryId);
        }
    }

    
}