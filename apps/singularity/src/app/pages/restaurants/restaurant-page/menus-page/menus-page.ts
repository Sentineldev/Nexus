import { Component, computed, OnInit } from "@angular/core";
import MenusDisplay from "./display/menus-display";
import RestaurantPageService from "../restaurant-page.service";
import MenusPageService from "./menus-page.service";
import SaveMenuForm from "./forms/save-menu-form";
import { Loader } from "../../../../shared/loader/loader";

@Component({
    selector: `app-restaurant-menus-page`,
    templateUrl: `./menus-page.html`,
    imports: [SaveMenuForm, MenusDisplay, Loader],
})
export default class MenusPage implements OnInit {


    public state = computed(() =>  this.menuService.getState());
    public restaurant = computed(() => this.restaurantPageService.getRestaurant());

    constructor(
        private readonly menuService: MenusPageService,
        private readonly restaurantPageService: RestaurantPageService
    ) {}
    ngOnInit(): void {
        this.menuService.getMenus();
    }
}