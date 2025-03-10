import { Component, computed, OnInit } from "@angular/core";
import MenusService from "./menus.service";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import CreateMenuModal from "./create-menu-modal";
import RestaurantPageService2 from "../restaurant-page.service";
import { Loader } from "../../../components/loader/loader";
import MenusDisplay from "./display/menus-display";

@Component({
    selector: `app-restaurant-menus`,
    template: `

        
        <app-create-menu-modal [dialogId]="dialogId()" [restaurant]="restaurant()"/>
        <div class="p-12">
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        @if (!state().loading) {
            
            <div class="w-full flex flex-col gap-8">
                <div class="flex">
                    <div class="flex-1">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-[300px]">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="search" id="search" class="outline-none" placeholder="Buscar Menu ">
                        </div>
                    </div>
                    <div>
                        <app-dialog-toggler [dialogId]="dialogId()">
                            <div class="btn">Crear Menu</div>
                        </app-dialog-toggler>
                    </div>
                </div>
                <app-menus-display [menus]="state().menus" />
            </div>
        }
        </div>
    
    `,
    imports: [DialogToggler, CreateMenuModal, Loader, MenusDisplay]
})
export default class RestaurantMenusPage implements OnInit {

    public restaurant = computed(() => this.restaurantPageService.getRestaurant());

    public dialogId = computed(() => `create-menu-at-restaurant-${this.restaurant().id}`);
    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: MenusService,
        private restaurantPageService: RestaurantPageService2,
    ) {}
    ngOnInit(): void {

        this.service.getMenus(this.restaurant().id);
    }
}