import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import LoadingScreen from "../../../../shared/loader/loading-screen";
import ProductsSelector from "./products/products-selector";

@Component({
    selector: `app-menu-category-page`,
    imports: [RouterOutlet, ErrorAlert, LoadingScreen, ProductsSelector],
    template: `
    
    @if (!state().loading && state().errorMessage.length === 0) {
        <router-outlet/>
        <app-products-selector/>
    }
    @if (!state().loading && state().errorMessage) {
        <app-error-alert [message]="state().errorMessage"/>
    }
    @if (state().loading) {
        <app-loading-screen label="Cargando menu..."/>
        
    }
    `
})
export default class MenuCategoryPage implements OnInit {


    public state = computed(() => {
        return this.service.getState();
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