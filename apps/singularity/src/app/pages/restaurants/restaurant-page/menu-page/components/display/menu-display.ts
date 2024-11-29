import { Component, EventEmitter, input, Output } from "@angular/core";
import Menu from "../../../../classes/menu.class";
import SaveMenuCategoryForm from "../forms/save-menu-category/save-menu-category-form";
import { SaveMenuCategory } from "../../../../dto/menu-category.dto";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-menu-display`,
    template: `
    <div class="max-h-[500px] h-[500px] bg-transparent overflow-auto  flex flex-col">
        <div class="bg-cyan-500 rounded-t-xl p-3">
            <h1 class="text-white font-sans text-[1.4rem] font-bold">{{menu().name}}</h1>
        </div>
        <div class="border flex-1 h-full overflow-auto rounded-b-xl flex flex-col gap-4">
            <div class="p-3">
                <app-save-menu-category (newCategoryEvent)="onNewCategory($event)" [menu]="menu()"/>
            </div>
            <div class="flex flex-col overflow-auto flex-1">
                @for (category of menu().categories; track category.id) {
                    <a routerLink="{{menu().id}}/{{category.id}}/products" class="font-sans text-[1.1rem] text-slate-700 hover:bg-slate-200 transition-all p-3 px-4">{{category.name}}</a>
                }
            </div>
        </div>
    </div>
    `,
    imports: [SaveMenuCategoryForm, RouterLink]
})
export default class MenuDisplay {

    @Output() newCategoryEvent = new EventEmitter<SaveMenuCategory>();

    public menu = input.required<Menu>();

    onNewCategory(body: SaveMenuCategory) {
        this.newCategoryEvent.emit(body);
    }
}