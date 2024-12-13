import { Component, input } from "@angular/core";
import Restaurant from "../../classes/restaurant.class";

@Component({
    selector: "app-restaurant-top-hero",
    template: `
        <div class="flex  bg-[rgba(0,0,0,0.8)] min-h-[220px] rounded-lg w-full">
            <div class="h-full self-end w-full p-6">
                <h1 class="text-white text-[1.6rem] font-sans font-bold"> {{restaurant().name}} </h1>
            </div>
        </div>
    `
})
export default class RestaurantTopHero {



    public restaurant = input.required<Restaurant>()
}