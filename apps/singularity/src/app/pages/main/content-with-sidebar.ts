import { Component, computed } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import AuthService from "./auth.service";

@Component({
    selector: `app-content-with-sidebar`,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    styleUrl: './style.css',
    template: `
    <div class="h-screen lg:flex">
        <nav class="w-full  lg:w-[300px] bg-white border-r flex flex-col">
            
            <div class="flex lg:flex-col w-full">
                <div class="flex-1 flex items-center lg:border-b p-4 py-2">
                    <label class="btn block lg:hidden" for="toggler">
                        <img src="/svg/menu-svgrepo-com.svg" alt="menu icon" width="24" height="24">
                    </label>
                    <h1 class="font-bold text-primary text-3xl p-3">Nexus</h1>
                </div>
                <div class="px-8 py-5 lg:border-b flex items-center gap-2 lg:gap-0">
                    <h1 class="text-lg flex-1 line-clamp-1">{{user().shortName}}</h1>
                    <button (click)="logoutHandler()" type="button" class="logout-btn bg-primary  p-1 px-3">
                        <img src="/svg/logout-svgrepo-com.svg" width="22" height="22" alt="Logout button">
                    </button>
                </div>
            </div>
            <input class="hidden" type="checkbox" name="toggler" id="toggler">
            <div id="sidebar-content" class=" transition-all hidden lg:block p-4 py-5 pt-6 h-full">
                <ul class="flex flex-col gap-2">
                    <li>
                        <a routerLink="/admin/restaurants" routerLinkActive="link-activate" class=" rounded-lg text-neutral block  font-medium text-lg p-3">Restaurantes</a>
                    </li>
                    <li>
                        <a routerLink="/admin/product-management/" routerLinkActive="link-activate" class="block text-neutral font-medium text-lg p-3" >Productos</a>
                    </li>
                    <li>
                        <a routerLink="/admin/clients" routerLinkActive="link-activate" class="block text-neutral font-medium text-lg p-3">Clientes</a>
                    </li>
                    <li>
                        <a routerLink="/admin/user-management/" routerLinkActive="link-activate" class="block text-neutral font-medium text-lg p-3">Usuarios</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="flex-1 h-full bg-secondary">
            <router-outlet/>
        </div>
    </div>
    `
})
export default class ContentWithSideBar {


    public user = computed(() => this.authService.getUser());

    constructor(
        private readonly authService: AuthService
    ) {}

    logoutHandler() {
        this.authService.logOut();
    }
}