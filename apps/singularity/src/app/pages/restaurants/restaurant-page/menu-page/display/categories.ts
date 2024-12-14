import { Component, input } from "@angular/core";
import MenuCategory from "../../../classes/menu-category.class";
import { MenuCategoryShort } from "../../../classes/menu.class";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-categories-display`,
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%);
    }
    `,
    template: `
    
    <div class="grid grid-cols-3 gap-3">
        @for (category of categories(); track category.id) {
            <a routerLink="" class=" flex items-end hover:opacity-90 transition-all ">
                <div class="relative h-[180px] rounded-xl">
                    <img src="/placeholder-menu.jpg" class="rounded-xl h-[180px] min-w-[280px] w-[500px]">
                    <div class="gradient-selector w-full h-full flex items-end p-7 absolute top-0 rounded-xl">
                        <h1 class="text-white text-[1.4rem] font-medium font-sans">{{category.name}}</h1>
                    </div>
                </div>
            </a>
        }
    </div>
    `,
    imports: [RouterLink],
})
export default class CategoriesDisplay {

    public categories = input.required<MenuCategoryShort[]>()
}