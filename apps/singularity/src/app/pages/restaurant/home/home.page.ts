import { Component, computed } from "@angular/core";
import RestaurantPageService2 from "../restaurant-page.service";
import TopBar2 from "../../../shared/topbar2/top-bar-2";
import { RouterLink, RouterOutlet} from "@angular/router";

@Component({
    selector: `app-restaurant-home-page`,
    template: `
    <div>
        <app-topbar [label]="restaurant().name"/>
        <div class="bg-white ">
            <ul class="flex gap-0">
                <li>
                    <a class="block border-primary border-b-2 py-5 px-8 text-xl">Dashboard</a>    
                </li>
                <li>
                    <a [routerLink]="menusUrl()" class="block border-primary  py-5 px-8 text-xl">Menus</a>    
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
    imports: [TopBar2, RouterLink, RouterOutlet]
})
export default class RestaurantHomePage2 {


    public restaurant = computed(() => this.service.getRestaurant());

    public menusUrl = computed(() => `/admin/restaurant/${this.restaurant().id}/menus`);
    public configUrl = computed(() => `/admin/restaurant/${this.restaurant().id}/config`);

    constructor(
        private readonly service: RestaurantPageService2,
    ) {}
}