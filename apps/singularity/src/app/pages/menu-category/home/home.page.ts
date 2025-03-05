import { Component, computed } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import TopBar2 from "../../../shared/topbar2/top-bar-2";
import MenuCategoryPageService2 from "../menu-category-page.service";

@Component({
    selector: `app-menu-category-home-page`,
    template: `
    
    <div class="flex flex-col h-full">
        <app-topbar [label]="category().name"/>
        <div class="bg-white">
            <ul class="flex gap-0">
                <li>
                    <a [routerLink]="restaurantUrl()" class="block py-5 px-8 text-xl">Restaurante</a>    
                </li>    
                <li>
                    <a [routerLink]="menuUrl()" class="block py-5 px-8 text-xl">Menu</a>    
                </li>
                <li>
                    <a routerLinkActive="border-primary border-b-2" [routerLink]="productsUrl()" class="block border-primary  py-5 px-8 text-xl">Productos</a>    
                </li>
                <li>
                    <a routerLinkActive="border-primary border-b-2" [routerLink]="configUrl()" class="block border-primary  py-5 px-8 text-xl">Configuracion</a>    
                </li>
            </ul>
        </div>
        <div class="flex-1">
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