import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import SelectionContainer from "./products/selection-container";
import MenuPageService from "../menu-page/menu-page.service";

@Component({
    selector: `app-menu-category-page`,
    imports: [SelectionContainer],
    template: `

    @if (state().category) {
        <div class=" flex flex-col gap-4 h-full">
            <div class="flex items-center gap-2 px-5">
                <img src="/restaurant-fork-knife-svgrepo-com-black.svg" width="32" height="32" alt="restaurnt fork knife">
                <h1 class="font-sans text-[1.6rem]">{{state().category!.name}}</h1>
            </div>
            <div class="h-full p-2">
                <app-selection-container/>
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