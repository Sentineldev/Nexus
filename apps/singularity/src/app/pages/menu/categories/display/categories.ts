import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import MenuCategory from "../../../restaurants/classes/menu-category.class";
import CategoryDisplay from "./category-display";

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
            <app-category-display [category]="category"/>
        }
    </div>
    `,
    imports: [CategoryDisplay],
})
export default class CategoriesDisplay {

    public categories = input.required<MenuCategory[]>()
}