import { Component, EventEmitter, input, Output } from "@angular/core";
import Menu from "../../../../classes/menu.class";
import SaveMenuCategoryForm from "../forms/save-menu-category/save-menu-category-form";
import { SaveMenuCategory } from "../../../../dto/menu-category.dto";

@Component({
    selector: `app-menu-display`,
    template: `
    <div class="min-h-[500px] flex flex-col">
        <div class="bg-cyan-500 p-3 rounded-t-xl">
            <h1 class="text-white font-sans text-[1.3rem]">{{menu().name}}</h1>
        </div>
        <div class="shadow flex-1 rounded-b-xl p-4 flex flex-col gap-4">
            <div>
                <app-save-menu-category (newCategoryEvent)="onNewCategory($event)" [menu]="menu()"/>
            </div>
            <div class="flex flex-col gap-4">
                @for (category of menu().categories; track category.id) {
                    <p class="font-sans text-[1.1rem] text-slate-700">{{category.name}}</p>
                }
            </div>
        </div>
    </div>
    `,
    imports: [SaveMenuCategoryForm]
})
export default class MenuDisplay {

    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();

    public menu = input.required<Menu>();

    onNewCategory(body: SaveMenuCategory) {
        this.newCategoryEvent.emit(body);
    }
}