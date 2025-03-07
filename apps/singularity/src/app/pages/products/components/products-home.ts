import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import TopBar2 from "../../../shared/topbar2/top-bar-2";

@Component({
    selector: `app-products-home`,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, TopBar2],
    template: `
    <div>
        <app-topbar label="Productos"/>
        <div class="bg-white ">
            <ul class="flex gap-0">
                <li>
                    <a routerLinkActive="border-b-2 border-primary" routerLink="/admin/product-management/products" class="block py-5 px-8 text-xl">Productos</a>    
                </li>    
                <li>
                    <a routerLinkActive="border-b-2 border-primary" routerLink="/admin/product-management/feed-stock" class="block py-5 px-8 text-xl">Materia Prima</a>    
                </li>
            </ul>
        </div>
        <div>
            <router-outlet/>
        </div>
    </div>
    `
})
export default class ProductsHome implements OnInit {


    constructor(
        private readonly router: Router
    ) {}
    ngOnInit(): void {
        this.router.navigate(['/admin/product-management/products']);
    }
}