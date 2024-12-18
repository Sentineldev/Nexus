import { Component, computed, OnInit } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import RestaurantTopHero from "../components/restaurant-top-hero";
import RestaurantUpdateForm from "./update-form";

@Component({
    selector: `app-restaurant-config-page`,
    template: `

    <div class="p-6">
        <app-restaurant-top-hero [restaurant]="restaurant()"/>
    </div>
    <div class="p-6">
        <app-restaurant-update-form [restaurant]="restaurant()"/>
    </div>
    `,
    imports: [RestaurantTopHero, RestaurantUpdateForm]
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