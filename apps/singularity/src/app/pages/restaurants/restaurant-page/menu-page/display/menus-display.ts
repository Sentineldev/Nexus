import { Component, EventEmitter, input, Output } from "@angular/core";
import MenuDisplay from "./menu-display";
import Menu from "../../../classes/menu.class";
import { SaveMenuCategory } from "../../../dto/menu-category.dto";

@Component({
    selector: `app-menus-display`,
    styles:`
    
    .menus-display-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(400px, auto))
    }
    `,
    template: `
    <div class="menus-display-container justify-center gap-6 items-center">
        @for (menu of menus(); track menu.id) {
            <app-menu-display (newCategoryEvent)="onNewCategory($event)" [menu]="menu"/>
        }
    </div>
    `,
    imports: [MenuDisplay]
})
export default class MenusDisplay {


    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();

    onNewCategory(body: SaveMenuCategory) {
        this.newCategoryEvent.emit(body);
    }

    public menus = input<Menu[]>([]);
}