import { Component, EventEmitter, input, Output, signal } from "@angular/core";
import Menu from "../../../classes/menu.class";
import { SaveMenuCategory } from "../../../dto/menu-category.dto";
import MenuDisplay from "./menu-display";

@Component({
    selector: `app-menus-display`,
    styles:`
    
    .menus-display-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(350px, auto))
    }
    `,
    template: `
    <div class="menus-display-container justify-start gap-8 items-start">
        @for (menu of menus(); track menu.id) {
            <app-menu-display [menu]="menu"/>
        }
    </div>
    `,
    imports: [MenuDisplay]
})
export default class MenusDisplay {
    


    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();

    public selectedMenu = signal<Menu | undefined>(undefined);

    public menus = input<Menu[]>([]);
}