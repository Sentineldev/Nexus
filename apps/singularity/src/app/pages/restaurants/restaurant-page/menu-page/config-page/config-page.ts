import { Component, computed, OnInit } from "@angular/core";
import MenuPageService from "../menu-page.service";
import MenuTopHero from "../../components/menu-top-hero";
import RestaurantPageService from "../../restaurant-page.service";
import UpdateMenuForm from "./update-form";
import DeleteMenuModal from "./delete-modal";

@Component({
    selector: `app-menu-config-page`,
    template: `
        <div class="py-4 px-6 flex flex-col gap-4">
            <app-delete-menu-modal [menu]="menu()"/>
            <app-update-menu-form [menu]="menu()"/>
        </div>
    `,
    imports: [UpdateMenuForm, DeleteMenuModal]
})
export default class MenuConfigPage implements OnInit {


    public menu = computed(() => this.menuPageService.getMenu());

    constructor(
        private readonly menuPageService: MenuPageService,
        private readonly restaurantPageService: RestaurantPageService,
    ) {}
    ngOnInit(): void {
        this.restaurantPageService.stopLoading();
    }
}