import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import Restaurant from "../../../core/classes/restaurant.class";

@Component({
    selector: 'app-restaurant-display',
    imports: [RouterLink],
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%);
    }
    `,
    template: `
        <a [routerLink]="routerLink()" class="transition-all hover:opacity-90 duration-300 border-slate-200 lg:w-[380px] flex flex-col gap-2 border-none">
            <div class="border-none min-h-[180px] relative">
                <img src="/default-restaurant-img.jpg" class="rounded-xl opacity-80" alt="Restaurant Placeholder Image">
                <div class="gradient-selector w-full h-full flex items-center rounded-xl absolute bottom-0">
                    <div class="w-full mt-4 h-[60%] flex items-end justify-center">
                        <p class="text-slate-50 font-sans text-center text-[1.5rem] font-bold">{{restaurant().name}}</p>
                    </div>
                </div>
            </div>
        </a>

    `
})
export default class RestaurantDisplay {  

    public restaurant = input.required<Restaurant>();

    public routerLink = computed(() => `/admin/restaurant/${this.restaurant().id}/menus`)
    // public routerLink = computed(() => `/admin/restaurant/${this.restaurant().id}/home/menus`)
}