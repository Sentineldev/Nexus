import { Component, computed } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import MenuTopHero from "../../components/menu-top-hero";
import MenuPageService from "../menu-page.service";

@Component({
    selector: `app-menu-home-page`,
    imports: [RouterOutlet, RouterLink, MenuTopHero], 
    template: `
    <div class="flex lg:flex-row flex-col gap-2 p-3 h-full overflow-auto">
        <div class="lg:w-60 w-full px-2">
            <div class="flex flex-col gap-2 border-b lg:border-b-0 lg:border-r h-full">
                <ul class="flex lg:flex-col">
                    <li>
                        <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/categories" class="text-slate-700 block p-3 hover:bg-slate-500 hover:text-white transition-all">Categorias</a>
                    </li>
                    <li>
                        <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/config" class="text-slate-700 block p-3 hover:bg-slate-500 hover:text-white transition-all">Configuracion</a>
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