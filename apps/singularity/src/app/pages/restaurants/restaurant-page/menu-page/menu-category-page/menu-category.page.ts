import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import SelectionContainer from "./products/category-product-selection-page";
import MenuPageService from "../menu-page.service";

@Component({
    selector: `app-menu-category-page`,
    imports: [RouterOutlet, RouterLink],
    styles: `
     .gradient-selector {
        background: rgb(2,0,36);
        background: linear-gradient(33deg, rgba(2,0,36,1) 11%, rgba(0,0,0,0.01) 100%); 
    }
    `,
    template: `

    @if (state().category) {
        <div class=" flex flex-col gap-4 h-full px-4">
            <div class="flex items-center gap-2 p-2  gradient-selector rounded-lg">
                <a routerLink="config">
                    <img src="/svg/config-svgrepo-com-white.svg" width="24" height="24" alt="configuration icon">
                </a>
                <a routerLink="/admin/restaurant/{{menu().restaurant.id}}/menu/{{menu().id}}/category/{{state().category!.id}}" class="flex items-center gap-1">
                    <img src="/restaurant-fork-knife-svgrepo-com-white.svg" width="24" height="24" alt="restaurnt fork knife">
                    <h1 class="font-sans text-[1.2rem] text-white">{{state().category!.name}}</h1>
                </a>
            </div>
            <div class="h-full">
                <router-outlet/>
            </div>
        </div>
    }
   
    `
})
export default class MenuCategoryPage implements OnInit {


    public state = computed(() => {
        return this.service.getState();
    });
    public menu = computed(() => this.menuPageService.getMenu())
    constructor(
        private readonly route: ActivatedRoute,
        private readonly service: MenuCategoryPageService,
        private readonly menuPageService: MenuPageService
    ) {}

    ngOnInit(): void {

        const categoryId = this.route.snapshot.paramMap.get('categoryId');

        if (categoryId) {
            this.service.getById(categoryId);
        }
    }

    
}