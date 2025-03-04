import { Component, computed, input} from "@angular/core";
import { RouterLink } from "@angular/router";
import Menu from "../../../restaurants/classes/menu.class";

@Component({
    selector: `app-menu-display`,
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 100%);
    }
    `,
    template: `
    <a [routerLink]="routerLink()" class=" flex items-end hover:opacity-90 transition-all ">
        <div class="relative h-[180px] rounded-xl">
            <img src="/placeholder-menu.jpg" class="rounded-xl h-[180px] min-w-[280px] w-[500px] object-cover">
            <div class="gradient-selector w-full h-full flex items-end p-7 absolute top-0 rounded-xl">
                <div class="flex flex-col">
                    <h1 class="text-white text-[1.4rem] font-medium font-sans">{{menu().name}}</h1>
                    <p class="text-slate-200 font-sans text-[0.95rem]">Ver menu</p>
                </div>
            </div>
        </div>
    </a>
    `,
    imports: [RouterLink]
})
export default class MenuDisplay {

    public menu = input.required<Menu>();


    public routerLink = computed(() => `/admin/restaurant/${this.menu().restaurant.id}/menu/${this.menu().id}/categories`)

}