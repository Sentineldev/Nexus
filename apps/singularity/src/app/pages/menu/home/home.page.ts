import { Component, computed } from "@angular/core";
import MenuPageService2 from "../menu-page.service";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import TopBar2 from "../../../components/topbar2/top-bar-2";

@Component({
    selector: `app-menu-home-page`,
    template: `
    
    <div>
        <app-topbar [label]="menu().name"/>
        <div class="bg-white overflow-auto w-full ">
            <ul class="flex gap-0">
                <li>
                    <a [routerLink]="restaurantUrl()" class="submenu-link">Restaurante</a>    
                </li>    
                <li>
                    <a routerLinkActive="border-primary border-b-2" [routerLink]="categoriesUrl()" class="submenu-link">Categorias</a>    
                </li>
                <li>
                    <a routerLinkActive="border-primary border-b-2" [routerLink]="configUrl()" class="submenu-link">Configuracion</a>    
                </li>
            </ul>
        </div>
        <div>
            <router-outlet/>
        </div>
    </div>
    `,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, TopBar2]
})
export default class MenuHomePage2 {


    public menu = computed(() => this.service.getMenu());

    public restaurantUrl = computed(() => `/admin/restaurant/${this.menu().restaurant.id}/menus`);
    public categoriesUrl = computed(() => `/admin/restaurant/${this.menu().restaurant.id}/menu/${this.menu().id}/categories`);
    public configUrl = computed(() => `/admin/restaurant/${this.menu().restaurant.id}/menu/${this.menu().id}/config`);

    constructor(    
        private readonly service: MenuPageService2
    ) {}
}