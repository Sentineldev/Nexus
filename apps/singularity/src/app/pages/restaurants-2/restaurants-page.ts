import { Component, computed } from "@angular/core";
import TopBar2 from "../../shared/topbar2/top-bar-2";
import RestaurantsPageService from "./restaurants-page.service";
import { Loader } from "../../shared/loader/loader";
import RestaurantsDisplay from "../restaurants/components/display/restaurants-display";
import DialogToggler from "../../shared/dialog/dialog-toggler";
import CreateRestaurantModal from "./create-restaurant-modal";

@Component({
    selector: `app-restaurants-page-2`,
    template: `
    <app-create-restaurant-modal dialogId="create-restaurant-modal"/>
    <div class="flex flex-col gap-4">
        <app-topbar label="Restaurantes"/>
        <div class="p-12">
            @if (state().loading) {
                <app-loader color="secondary"/>
            }
            @if(!state().loading && state().data) {
                <div class="w-full flex flex-col gap-8">
                    <div class="flex">
                        <div class="flex-1">
                            <input type="text" name="" id="" class="border p-3 rounded-lg border-slate-300 outline-none" placeholder="Buscar restaurante ">
                        </div>
                        <div>
                            <app-dialog-toggler dialogId="create-restaurant-modal">
                                <div class="btn">Crear restaurante</div>
                            </app-dialog-toggler>
                        </div>
                    </div>
                    <app-restaurants-display [restaurants]="state().data!.data"/>
                </div>
            }
        </div>
    </div>
    `,
    imports: [TopBar2, Loader, RestaurantsDisplay, DialogToggler, CreateRestaurantModal],
})
export default class RestaurantsPage2 {

    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: RestaurantsPageService
    ) {}
}   