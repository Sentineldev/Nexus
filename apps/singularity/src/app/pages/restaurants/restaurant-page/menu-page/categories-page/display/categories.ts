import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import MenuCategory from "../../../../classes/menu-category.class";

@Component({
    selector: `app-categories-display`,
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%);
    } 
    `,
    template: `
    
    <div class="flex flex-col h-full overflow-auto">
        @for (category of categories(); track category.id) {
            <a routerLink="/admin/restaurant/{{category.menu.restaurant.id}}/menu/{{category.menu.id}}/category/{{category.id}}/products" class="flex gap-4 hover:bg-slate-300 transition-all p-3 px-2">
                <img src="/restaurant-fork-knife-svgrepo-com-black.svg" width="32" height="32" alt="restaurant fork knife">
                <div class="flex flex-col">
                    <span class="font-sans text-[1.2rem] text-slate-700">{{category.name}}</span>
                    <span class="font-sans text-[0.95rem] text-slate-500">Categoria</span>
                </div>
            </a>
        }
    </div>
    `,
    imports: [RouterLink],
})
export default class CategoriesDisplay {

    public categories = input.required<MenuCategory[]>()
}