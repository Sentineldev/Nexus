import { Component, computed, signal } from "@angular/core";
import SaveRestaurantForm from "./forms/save-restaurant-form";
import RestaurantsDisplay from "./display/restaurants-display";
import { SaveRestaurant } from "./dto/restaurant.dto";
import RestaurantService from "./services/restaurant.service";

@Component({
    selector: 'app-restaurants-page',
    imports: [SaveRestaurantForm, RestaurantsDisplay],
    templateUrl: './restaurants-page.html',
})
export default class RestaurantsPage {  




    public state = computed(() => this.service.getState())


    constructor(
        private readonly service: RestaurantService,
    ) {}

    async onSaveRestaurantHandler(body: SaveRestaurant) {
        this.service.save(body);
    }
}
  