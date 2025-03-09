import { Component, computed, OnInit } from "@angular/core";
import MenuCategoryPageService2 from "./menu-category-page.service";
import LoadingScreen from "../../components/loader/loading-screen";
import { ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
    selector: `app-menu-category-page2`,
    template: `
    <div class="h-full overflow-auto">
        @if (state().loading) {
            <app-loading-screen label="Cargando categoria..."/>
        }
        @if (!state().loading && !state().hasError) {
            <router-outlet/>
        }
        @if (!state().loading && state().hasError) {
            <p>Los datos no pudieron ser cargados...</p>
        }
    </div>
    `,
    imports: [LoadingScreen, RouterOutlet]
})
export default class MenuCategoryPage2 implements OnInit {


    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: MenuCategoryPageService2,
        private readonly route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        const menuId  = this.route.snapshot.paramMap.get("categoryId");
        if (!menuId) {

            return;
        }
        this.service.loadCategory(menuId);
    }
}