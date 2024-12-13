import { Component, EventEmitter, input, Output, signal } from "@angular/core";
import Menu from "../../../classes/menu.class";
import { SaveMenuCategory } from "../../../dto/menu-category.dto";
import MenuDisplay from "./menu-display";

@Component({
    selector: `app-menus-display`,
    styles:`
    
    .menus-display-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(400px, auto))
    }
    `,
    template: `
    <div class="menus-display-container justify-start gap-4 items-start">
        @for (menu of menus(); track menu.id) {
            <app-menu-display (newCategoryEvent)="onNewCategory($event)" [menu]="menu"/>
        }
    </div>
    `,
    imports: [MenuDisplay]
})
export default class MenusDisplay {
    


    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();

    public selectedMenu = signal<Menu | undefined>(undefined);

    onNewCategory(body: SaveMenuCategory) {
        this.newCategoryEvent.emit(body);
    }

    public menus = input<Menu[]>([]);
}