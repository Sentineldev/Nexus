import { Component, computed, input } from "@angular/core";
import MenuCategory from "../../../restaurants/classes/menu-category.class";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-category-display`,
    template: `
    <a [routerLink]="routerLink()" router class="flex gap-4 hover:bg-slate-300 transition-all p-3 px-2">
        <img src="/restaurant-fork-knife-svgrepo-com-black.svg" width="32" height="32" alt="restaurant fork knife">
        <div class="flex flex-col">
            <span class="font-sans text-[1.2rem] text-slate-700">{{category().name}}</span>
            <span class="font-sans text-[0.95rem] text-slate-500">Categoria</span>
        </div>
    </a>
    `,
    imports: [RouterLink],
})

export default class CategoryDisplay {

    public category = input.required<MenuCategory>();

    public routerLink = computed(() => `/admin/restaurant/${this.category().menu.restaurant.id}/menu/${this.category().menu.id}/category/${this.category().id}/config`);
}