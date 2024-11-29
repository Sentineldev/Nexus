import { Component, computed, OnInit } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import SaveMenuForm from "./components/forms/save-menu/save-menu-form";
import { SaveMenu } from "../../dto/menu.dto";
import MenuPageService from "./menu-page.service";
import MenusDisplay from "./components/display/menus-display";
import { SaveMenuCategory } from "../../dto/menu-category.dto";

@Component({
    selector: `app-restaurant-menu-section`,
    templateUrl: `./menu-page.html`,
    imports: [SaveMenuForm, MenusDisplay],
})
export default class MenuPage implements OnInit {


    public state = computed(() =>  this.menuService.getState());

    constructor(
        private readonly menuService: MenuPageService,
    ) {}
    ngOnInit(): void {
        this.menuService.getMenu();
    }
    onSaveMenuCategoryHandler(body: SaveMenuCategory) {
        this.menuService.addCategory(body);
    }
    
    onSaveMenuHandler(body: SaveMenu) {
        this.menuService.save(body);
    }
}