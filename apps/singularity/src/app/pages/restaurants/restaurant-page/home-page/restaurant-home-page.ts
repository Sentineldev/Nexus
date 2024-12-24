import { Component, computed } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import RestaurantTopHero from "../components/restaurant-top-hero";
@Component({
    selector: 'app-restaurant-home',
    imports: [RouterLink, RouterOutlet, RestaurantTopHero],
    templateUrl: `./restaurant-home-page.html`
})
export default class RestaurantHomePage {


    public restaurant = computed(() => this.service.getRestaurant());



    constructor(
        private readonly service: RestaurantPageService,
    ) {}

}
  