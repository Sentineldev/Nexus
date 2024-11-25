import { Component, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import Restaurant from "../classes/restaurant.class";
import LocalRestaurantService from "../services/local-restaurant-service";
@Component({
    selector: 'app-restaurant-page',
    imports: [RouterOutlet],
    template: `<router-outlet/>`,
})
export default class RestaurantPage {

    public restaurant = signal<Restaurant>({
        id: "",
        name: ""
    });

    constructor(
        private readonly route: ActivatedRoute,
        private readonly service: LocalRestaurantService
    ) {

        const restaurantId = this.route.snapshot.paramMap.get("restaurantId")!;
        this.service.getById(restaurantId)
            .then((response) => {
                if (response) {
                    this.restaurant.set(response)
                } 
            })
        
    }




}
  