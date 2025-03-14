import { Component, computed } from "@angular/core";
import TopBar2 from "../../components/topbar2/top-bar-2";
import RestaurantsPageService from "./restaurants-page.service";
import { Loader } from "../../components/loader/loader";
import DialogToggler from "../../components/dialog/dialog-toggler";
import CreateRestaurantModal from "./create-restaurant-modal";
import RestaurantsDisplay from "./display/restaurants-display";

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
                    <div class="flex flex-col gap-8 lg:flex-row lg:gap-8">
                        <div class="flex-1">
                            <div class="search-bar">
                                <img src="/svg/search-svgrepo-com.svg" alt="">
                                <input type="search" name="search" id="search" placeholder="Buscar restaurante ">
                            </div>
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
    imports: [TopBar2, Loader, DialogToggler, CreateRestaurantModal, RestaurantsDisplay],
})
export default class RestaurantsPage2 {

    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: RestaurantsPageService
    ) {}
}   