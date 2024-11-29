import { Component, computed } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'app-restaurant-home',
    imports: [RouterLink],
    templateUrl: `./restaurant-home-page.html`
})
export default class RestaurantHomePage {


    public restaurant = computed(() => this.service.getRestaurant());



    constructor(
        private readonly service: RestaurantPageService,
    ) {}

}
  