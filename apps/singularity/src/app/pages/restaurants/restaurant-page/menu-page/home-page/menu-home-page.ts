import { Component, computed } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import MenuTopHero from "../../components/menu-top-hero";
import MenuPageService from "../menu-page.service";

@Component({
    selector: `app-menu-home-page`,
    imports: [RouterOutlet, RouterLink, MenuTopHero], 
    template: `
    <div class="flex gap-4 p-3 h-full overflow-auto">
        <div class="rounded-lg bg-slate-600 w-60">
            <div class="flex flex-col gap-2">
                <h1 class="text-center text-slate-300 p-3 pt-4">Menu</h1>
                <ul>
                    <li>
                        <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/categories" class="text-slate-200 block p-3 hover:bg-slate-500 hover:text-white transition-all">Categorias</a>
                    </li>
                    <li>
                        <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/config" class="text-slate-200 block p-3 hover:bg-slate-500 hover:text-white transition-all">Configuracion</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex-1 h-full overflow-auto">
            <app-menu-top-hero [menu]="menu()"/>
            <router-outlet/>
        </div>
    </div>
    `
})
export default class MenuHomePage {


    public menu = computed(() => this.menuPageService.getMenu());

    constructor(
        private readonly menuPageService: MenuPageService
    ) {}

}