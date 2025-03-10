import { Component, computed } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import AuthService from "./auth.service";

@Component({
    selector: `app-content-with-sidebar`,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    template: `
    <div class="h-screen flex bg-secondary">
        <nav class="w-[300px] bg-white border-r flex flex-col">
            <div class="border-b p-4 py-2">
                <h1 class="font-bold text-primary text-3xl p-3">Nexus</h1>
            </div>
            <div class="px-8 py-5 border-b flex items-center">
                <h1 class="text-lg flex-1 line-clamp-1">{{user().shortName}}</h1>
                <button (click)="logoutHandler()" type="button" class="logout-btn bg-primary  p-1 px-3">
                    <img src="/svg/logout-svgrepo-com.svg" width="22" height="22" alt="Logout button">
                </button>
            </div>
            <div class="p-4 py-5 pt-6 h-full">
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
        <div class="flex-1">
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