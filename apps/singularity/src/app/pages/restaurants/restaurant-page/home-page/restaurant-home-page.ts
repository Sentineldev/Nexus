import { Component, computed, OnInit } from "@angular/core";
import RestaurantPageService from "../restaurant-page.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import RestaurantTopHero from "../components/restaurant-top-hero";
import IndexPageService from "../../../index/index-page.service";
@Component({
    selector: 'app-restaurant-home',
    imports: [RouterLink, RouterOutlet, RestaurantTopHero],
    templateUrl: `./restaurant-home-page.html`
})
export default class RestaurantHomePage implements OnInit  {

    public restaurant = computed(() => this.service.getRestaurant());



    constructor(
        private readonly service: RestaurantPageService,
        private readonly indexPageService: IndexPageService
    ) {}
    ngOnInit(): void {
        this.indexPageService.showTopBar();
    }



}
  