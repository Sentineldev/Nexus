import { Component, input } from "@angular/core";
import MenuCategory from "../../classes/menu-category.class";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-category-top-hero`,
    imports: [RouterLink],
    styles: `
     .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(33deg, rgba(2,0,36,1) 11%, rgba(0,0,0,0.01) 100%); 
    }
    `,
    template: `
    <div class="flex items-center gap-2 p-2  gradient-selector rounded-lg">
        <a routerLink="config">
            <img src="/svg/config-svgrepo-com-white.svg" width="24" height="24" alt="configuration icon">
        </a>
        <a routerLink="/admin/restaurant/{{category().menu.restaurant.id}}/menu/{{category().menu.id}}/category/{{category().id}}" class="flex items-center gap-1">
            <img src="/restaurant-fork-knife-svgrepo-com-white.svg" width="24" height="24" alt="restaurnt fork knife">
            <h1 class="font-sans text-[1.2rem] text-white">{{category().name}}</h1>
        </a>
    </div>
    `
})
export default class CategoryTopHero {

    public category = input.required<MenuCategory>();
}