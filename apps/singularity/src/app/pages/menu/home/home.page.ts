import { Component, computed } from "@angular/core";
import MenuPageService2 from "../menu-page.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import TopBar2 from "../../../shared/topbar2/top-bar-2";

@Component({
    selector: `app-menu-home-page`,
    template: `
    
    <div>
        <app-topbar [label]="menu().name"/>
        <div class="bg-white ">
            <ul class="flex gap-0">
                <li>
                    <a [routerLink]="restaurantUrl()" class="block py-5 px-8 text-xl">Volver</a>    
                </li>    
                <li>
                    <a [routerLink]="categoriesUrl()" class="block border-primary border-b-2 py-5 px-8 text-xl">Categorias</a>    
                </li>
                <li>
                    <a [routerLink]="configUrl()" class="block border-primary  py-5 px-8 text-xl">Configuracion</a>    
                </li>
            </ul>
        </div>
        <div>
            <router-outlet/>
        </div>
    </div>
    `,
    imports: [RouterOutlet, RouterLink, TopBar2]
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