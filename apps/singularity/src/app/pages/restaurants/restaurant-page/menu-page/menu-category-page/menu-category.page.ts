import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import MenuCategoryPageService from "./menu-category-page.service";
import MenuPageService from "../menu-page.service";

@Component({
    selector: `app-menu-category-page`,
    imports: [RouterOutlet],
    template: `

    @if (state().category) {
        <div class="w-full h-full overflow-auto">
            <!-- <app-category-top-hero [category]="state().category!"/> -->
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