import { Component, computed, OnInit } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import RestaurantUpdateForm from "./update-form";

@Component({
    selector: `app-restaurant-config-page`,
    template: `

    <div class="flex flex-col gap-4 p-2 pt-4">
        <!-- <app-restaurant-top-hero [restaurant]="restaurant()"/> -->
        <app-restaurant-update-form [restaurant]="restaurant()"/>
    </div>
    `,
    imports: [RestaurantUpdateForm]
})
export default class RestaurantConfigPage implements OnInit {
    public restaurant = computed(() => this.restaurantPageService.getRestaurant());

    constructor(
        private readonly restaurantPageService: RestaurantPageService
    ) {}
    ngOnInit(): void {
        this.restaurantPageService.stopLoading();
    }
}