import { Component, computed, OnInit } from "@angular/core";
import DeleteMenuModal from "./delete-modal";
import UpdateMenuForm from "./update-form";
import MenuPageService2 from "../menu-page.service";

@Component({
    selector: `app-menu-config-page`,
    template: `
        <div class="py-6 flex flex-col gap-4 p-12">
            <app-delete-menu-modal [menu]="menu()"/>
            <app-update-menu-form [menu]="menu()"/>
        </div>
    `,
    imports: [DeleteMenuModal, UpdateMenuForm]
})
export default class MenuConfigPage{


    public menu = computed(() => this.menuPageService.getMenu());

    constructor(
        private readonly menuPageService: MenuPageService2,
    ) {}
    
}