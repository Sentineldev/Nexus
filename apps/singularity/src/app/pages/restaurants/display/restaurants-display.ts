import { Component, input } from "@angular/core";
import Restaurant from "../classes/restaurant.class";
import RestaurantDisplay from "./restaurant-display";

@Component({
    selector: 'app-restaurants-display',
    imports: [RestaurantDisplay],
    styles: `
    .restaurants-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(380px, auto))
    }
    `,
    template: `
    <div class="restaurants-container justify-start gap-12">
        @for (restaurant of restaurants(); track restaurant.id) {
            <app-restaurant-display [restaurant]="restaurant"/>
        }
    </div>
    `
})
export default class RestaurantsDisplay {  

    public restaurants = input<Restaurant[]>([])
}