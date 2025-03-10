import { Component, input, signal } from "@angular/core";
import MenuDisplay from "./menu-display";
import Menu from "../../../../core/classes/menu.class";

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
    


    public selectedMenu = signal<Menu | undefined>(undefined);

    public menus = input<Menu[]>([]);
}