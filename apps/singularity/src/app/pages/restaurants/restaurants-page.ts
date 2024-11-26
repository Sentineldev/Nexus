import { Component, computed, signal } from "@angular/core";
import SaveRestaurantForm from "./forms/save-restaurant-form";
import RestaurantsDisplay from "./display/restaurants-display";
import RestaurantService from "./services/restaurant.service";
import { SaveRestaurant } from "./dto/restaurant.dto";

@Component({
    selector: 'app-restaurants-page',
    imports: [SaveRestaurantForm, RestaurantsDisplay],
    templateUrl: './restaurants-page.html',
})
export default class RestaurantsPage {  




    public state = computed(() => this.service.getState())


    constructor(private readonly service: RestaurantService) {}

    async onSaveRestaurantHandler(body: SaveRestaurant) {
        this.service.save(body);
        this.service.getPage({
            ...this.state().filter,
        })
    }
}
  