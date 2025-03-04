import { Component, computed, OnInit, signal } from "@angular/core";
import RestaurantService from "./restaurant.service";
import SaveRestaurantForm from "./components/forms/save-restaurant-form";
import RestaurantsDisplay from "../restaurants-2/display/restaurants-display";

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
  