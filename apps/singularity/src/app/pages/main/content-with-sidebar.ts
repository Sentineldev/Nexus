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
            <input class="hidden" type="checkbox" name="toggler" id="toggler">
            <div class="flex lg:flex-col w-full justify-center ">
                <div class="flex-1 flex items-center lg:border-b p-4 py-2">
                    <label class="cursor-pointer block lg:hidden" for="toggler">
                        <img src="/svg/menu-svgrepo-com.svg" alt="menu icon" width="32" height="32">
                    </label>
                    <h1 class="font-bold text-primary text-3xl p-3">Nexus</h1>
                </div>
                <div class="px-6 py-5 lg:border-b flex items-center gap-6 lg:gap-0">
                    <div class="flex items-center flex-1 gap-2">
                        <img src="/svg/user-svgrepo-com.svg" alt="user icon" width="28" height="28"/>
                        <h1 class=" text-[1rem] flex-1 line-clamp-1 font-medium">{{user().shortName}}</h1>
                    </div>
                    <button (click)="logoutHandler()" type="button" class="outline-none cursor-pointer">
                        <img src="/svg/logout-svgrepo-com.svg" width="28" height="28" alt="Logout button">
                    </button>
                </div>
            </div>
            <div id="sidebar-content" class="grid grid-rows-[0fr] lg:grid-rows-[1fr] h-full">
                <ul class="flex flex-col gap-2">
                    <li class="px-4 pt-4">
                        <a routerLink="/admin/restaurants" routerLinkActive="link-activate" class=" rounded-lg text-neutral block  font-medium text-lg p-3">Restaurantes</a>
                    </li>
                    <li class="px-4">
                        <a routerLink="/admin/product-management/" routerLinkActive="link-activate" class="block text-neutral font-medium text-lg p-3" >Productos</a>
                    </li>
                    <li class="px-4">
                        <a routerLink="/admin/clients" routerLinkActive="link-activate" class="block text-neutral font-medium text-lg p-3">Clientes</a>
                    </li>
                    <li class="px-4">
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