import { Component, computed } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import TopBar2 from "../../../components/topbar2/top-bar-2";
import MenuCategoryPageService2 from "../menu-category-page.service";

@Component({
    selector: `app-menu-category-home-page`,
    template: `
    
    <div>
        <app-topbar [label]="category().name"/>
        <div class="bg-white overflow-x-auto w-full">
            <ul class="flex">
                <li>
                    <a [routerLink]="restaurantUrl()" class="submenu-link">Restaurante</a>    
                </li>    
                <li>
                    <a [routerLink]="menuUrl()" class="submenu-link">Menu</a>    
                </li>
                <li>
                    <a routerLinkActive="border-primary border-b-2" [routerLink]="productsUrl()" class="submenu-link">Productos</a>    
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
export default class MenuCategoryHomePage2 {


    public category = computed(() => this.service.getCategory());

    public restaurantUrl = computed(() => `/admin/restaurant/${this.category().menu.restaurant.id}/menus`);
    public menuUrl = computed(() => `/admin/restaurant/${this.category().menu.restaurant.id}/menu/${this.category().menu.id}/categories`);
    public productsUrl = computed(() => `/admin/restaurant/${this.category().menu.restaurant.id}/menu/${this.category().menu.id}/category/${this.category().id}/products`);
    public configUrl = computed(() => `/admin/restaurant/${this.category().menu.restaurant.id}/menu/${this.category().menu.id}/category/${this.category().id}/config`);

    constructor(    
        private readonly service: MenuCategoryPageService2
    ) {}
}