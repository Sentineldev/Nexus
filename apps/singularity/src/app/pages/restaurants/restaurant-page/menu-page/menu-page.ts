import { Component, computed, OnInit } from "@angular/core";
import MenuPageService from "./menu-page.service";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import MenuTopHero from "../components/menu-top-hero";

@Component({
    selector: `app-menu-page-2`,
    template: `

    <div class="w-full overflow-auto h-full">
        @if (state().menu) {
            <router-outlet/>
        }
    </div>
    `,
    imports: [RouterOutlet]
})
export default class MenuPage implements OnInit {



    public state = computed(() => this.menuPageService.getState());

    constructor(
        private readonly menuPageService: MenuPageService,
        private readonly routes: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        const menuId  = this.routes.snapshot.paramMap.get("menuId");

        if (menuId) {
            this.menuPageService.getById(menuId);
        }
    }

}