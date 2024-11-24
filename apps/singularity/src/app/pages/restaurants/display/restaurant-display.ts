import { Component, input } from "@angular/core";
import Restaurant from "../classes/restaurant.class";

@Component({
    selector: 'app-restaurant-display',
    imports: [],
    template: `
        <a class="transition-all hover:-translate-y-3 duration-300 border-slate-200 lg:w-[380px] flex flex-col gap-2 border-none">
            <div class="border-none min-h-[180px]">
                <img src="/default-restaurant-img.jpg" class="rounded-xl opacity-80" alt="Restaurant Placeholder Image">
            </div>
            <div class="p-2">
                <p class="text-center text-wrap font-sans text-[1.2rem] text-slate-700">{{restaurant().name}}</p>
            </div>
        </a>

    `
})
export default class RestaurantDisplay {  

    public restaurant = input<Restaurant>({
        id: "",
        name: ""
    });
}