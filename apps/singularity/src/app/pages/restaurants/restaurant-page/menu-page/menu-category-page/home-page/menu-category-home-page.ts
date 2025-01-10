import { Component, computed } from "@angular/core";
import MenuCategoryPageService from "../menu-category-page.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import MenuTopHero from "../../../components/menu-top-hero";
import CategoryTopHero from "../../../components/category-top-hero";

@Component({
    selector: `app-menu-category-home-page`,
    imports: [RouterLink, RouterOutlet, CategoryTopHero, MenuTopHero],
    template:  `
    <div class="flex lg:flex-row flex-col gap-2 p-3 h-full overflow-auto">
        <div class="lg:w-60 w-full px-2">
            <div class="flex flex-col gap-2 border-b lg:border-b-0 lg:border-r h-full">
                <ul class="flex lg:flex-col">
                    <li>
                        <a routerLink="/admin/restaurant/{{category().menu.restaurant.id}}/menu/{{category().menu.id}}/categories" class="text-slate-700 block p-3 hover:bg-slate-500 hover:text-white transition-all">Volver al menu</a>
                    </li>
                    <li>
                        <a routerLink="products" class="text-slate-700 block p-3 hover:bg-slate-500 hover:text-white transition-all">Productos</a>
                    </li>
                    <li>
                        <a routerLink="config" class="text-slate-700 block p-3 hover:bg-slate-500 hover:text-white transition-all">Configuracion</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex-1 h-full overflow-auto flex flex-col gap-2">
            <app-menu-top-hero [menu]="category().menu"/>
            <app-category-top-hero [category]="category()"/>
            <router-outlet/>
        </div>
    </div>
    `
})
export default class MenuCategoryHomePage {


    public category = computed(() => this.menuCategoryPageService.getCategory());
    constructor(
        private readonly menuCategoryPageService: MenuCategoryPageService
    ) {}
}