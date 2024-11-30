import { Component, computed, OnInit } from "@angular/core";
import SaveMenuForm from "./forms/save-menu/save-menu-form";
import { SaveMenu } from "../../dto/menu.dto";
import MenuPageService from "./menu-page.service";
import { SaveMenuCategory } from "../../dto/menu-category.dto";
import LoadingScreen from "../../../../shared/loader/loading-screen";
import MenusDisplay from "./display/menus-display";

@Component({
    selector: `app-restaurant-menus-page`,
    templateUrl: `./menu-page.html`,
    imports: [SaveMenuForm, MenusDisplay, LoadingScreen],
})
export default class MenusPage implements OnInit {


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