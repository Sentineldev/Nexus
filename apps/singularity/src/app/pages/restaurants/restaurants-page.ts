import { Component, computed, OnInit, signal } from "@angular/core";
import { SaveRestaurant } from "./dto/restaurant.dto";
import RestaurantService from "./restaurant.service";
import RestaurantsDisplay from "./components/display/restaurants-display";
import SaveRestaurantForm from "./components/forms/save-restaurant-form";

@Component({
    selector: 'app-restaurants-page',
    imports: [SaveRestaurantForm, RestaurantsDisplay],
    templateUrl: './restaurants-page.html',
})
export default class RestaurantsPage implements OnInit {  




    public state = computed(() => this.service.getState())


    constructor(
        private readonly service: RestaurantService,
    ) {}
    ngOnInit(): void {
        this.service.getPage(this.state().filter);
    }
}
  