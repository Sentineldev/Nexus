import { Component, computed, OnInit } from "@angular/core";
import MenuPageService2 from "./menu-page.service";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import LoadingScreen from "../../components/loader/loading-screen";

@Component({
    selector: `app-menu-page2`,
    template: `
    @if (state().loading) {
        <app-loading-screen label="Cargando menu..."/>
    }
    @if (!state().loading && !state().hasError) {
        <router-outlet/>
    }
    @if (!state().loading && state().hasError) {
        <p>Los datos no pudieron ser cargados...</p>
    }
    
    `,
    imports: [LoadingScreen, RouterOutlet]
})

export default class MenuPage2 implements OnInit {


    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: MenuPageService2, 
        private readonly route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        const menuId  = this.route.snapshot.paramMap.get("menuId");
        if (!menuId) {
            return;
        }
        this.service.loadMenu(menuId);
    }
}