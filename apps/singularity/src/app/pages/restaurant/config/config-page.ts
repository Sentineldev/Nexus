import { Component, computed } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import RestaurantUpdateForm from "./update-form";

@Component({
    selector: `app-restaurant-config-page`,
    template: `

    <div class="flex flex-col gap-4 p-12">
        <app-restaurant-update-form [restaurant]="restaurant()"/>
    </div>
    `,
    imports: [RestaurantUpdateForm]
})
export default class RestaurantConfigPage  {
    public restaurant = computed(() => this.restaurantPageService.getRestaurant());

    constructor(
        private readonly restaurantPageService: RestaurantPageService
    ) {}
}