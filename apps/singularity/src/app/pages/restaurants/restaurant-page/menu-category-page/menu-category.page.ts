import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import LoadingScreen from "../../../../shared/loader/loading-screen";
import SelectionContainer from "./products/selection-container";

@Component({
    selector: `app-menu-category-page`,
    imports: [RouterOutlet, ErrorAlert, LoadingScreen, SelectionContainer],
    template: `
    
    @if (!state().loading && state().errorMessage.length === 0) {
        <router-outlet/>
        <app-selection-container/>
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

        const categoryId = this.route.snapshot.paramMap.get('categoryId');

        if (categoryId) {
            this.service.getById(categoryId);
        }
    }

    
}