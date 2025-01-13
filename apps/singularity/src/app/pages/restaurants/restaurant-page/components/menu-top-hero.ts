import { Component, input } from "@angular/core";
import Menu from "../../classes/menu.class";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-menu-top-hero`,
    styles: `
    .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(33deg, rgba(2,0,36,1) 11%, rgba(0,0,0,0.01) 100%); 
    }
    
    `,
    template: `
    <div class="flex flex-col gap-2">
        <div class="flex gap-2">
            <!-- <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}" class="hover:bg-slate-300 transition-all w-fit p-2 rounded-lg font-sans text-[1.2rem] flex items-center gap-2">
                <img src="/table-rows-svgrepo-com.svg" width="28" height="28" alt="store icon">
                Categorias
            </a>     -->
            <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/home/menus" class="hover:bg-slate-300 transition-all w-fit p-2 rounded-lg font-sans text-[1.2rem] flex items-center gap-2">
                <img src="/store-svgrepo-com-black.svg" width="28" height="28" alt="store icon">
                {{menu().restaurant.name}}
            </a>
        </div>
        <div class="flex flex-col bg-transparent rounded-xl w-full">
            <div class="relative w-full h-full min-h-[220px]">
                <img src="/placeholder-menu.jpg" class="rounded-xl h-[220px] w-full object-cover">
                <div class="absolute gradient-selector w-full top-0 h-full rounded-xl flex flex-col p-6">
                    <div class="flex-1 flex items-start gap-2">
                        <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/categories">
                            <img src="/restaurant-menu-svgrepo-com-white.svg" width="42" height="42" alt="store icon">
                        </a>
                        <!-- <a routerLink="config">
                            <img src="/svg/config-svgrepo-com-white.svg" width="42" height="42" alt="configuration icon">
                        </a> -->
                    </div>
                    <div class="">
                        <h1 class="text-white text-[1.6rem] font-sans font-bold"> {{menu().name}} </h1>
                        <p class="text-slate-200 font-sans text-[1rem]">Menu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    imports: [RouterLink]
})
export default class MenuTopHero {

    public menu = input.required<Menu>()

}