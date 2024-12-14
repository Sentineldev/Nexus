import { Component, computed, OnInit } from "@angular/core";
import SaveMenuForm from "./forms/save-menu/save-menu-form";
import MenuPageService from "./menus-page.service";
import { SaveMenuCategory } from "../../dto/menu-category.dto";
import MenusDisplay from "./display/menus-display";

@Component({
    selector: `app-restaurant-menus-page`,
    templateUrl: `./menus-page.html`,
    imports: [SaveMenuForm, MenusDisplay],
})
export default class MenusPage implements OnInit {


    public state = computed(() =>  this.menuService.getState());

    constructor(
        private readonly menuService: MenuPageService,
    ) {}
    ngOnInit(): void {
        this.menuService.getMenus();
    }
    onSaveMenuHandler() {
        this.menuService.getMenus();
    }
}