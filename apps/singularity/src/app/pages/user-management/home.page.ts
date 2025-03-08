import { Component } from "@angular/core";
import TopBar2 from "../../shared/topbar2/top-bar-2";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: `app-user-management-home-page`,
    template: `
    <div>
        <app-topbar label="Gestion de Usuarios"/>
        <div class="bg-white ">
            <ul class="flex gap-0">
                <li>
                    <a routerLinkActive="border-b-2 border-primary" routerLink="/admin/user-management/users" class="block py-5 px-8 text-xl">Usuarios</a>    
                </li>    
                <li>
                    <a routerLinkActive="border-b-2 border-primary" routerLink="/admin/user-management/employees" class="block py-5 px-8 text-xl">Empleados</a>    
                </li>
            </ul>
        </div>
        <div>
            <router-outlet/>
        </div>
    </div>
    `,
    imports: [TopBar2, RouterOutlet, RouterLinkActive, RouterLink]
})
export default class UserManagementHomePage {


}