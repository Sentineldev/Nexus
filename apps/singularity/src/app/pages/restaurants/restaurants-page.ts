import { Component, signal } from "@angular/core";
import SaveRestaurantForm from "./forms/save-restaurant-form";
import { SaveRestaurant } from "./interfaces/restaurant-service.interface";
import LocalRestaurantService from "./services/local-restaurant-service";
import { PageData } from "../../shared/types/pagination";
import Restaurant from "./classes/restaurant.class";
import RestaurantsDisplay from "./display/restaurants-display";

@Component({
    selector: 'app-restaurants-page',
    imports: [SaveRestaurantForm, RestaurantsDisplay],
    templateUrl: './restaurants-page.html',
})
export default class RestaurantsPage {  



    public restaurants = signal<PageData<Restaurant>>({
        data: [],
        meta: {
            dataSize: 0,
            page: 1,
            pageSize: 5
        }
    });
    constructor(
        private readonly service: LocalRestaurantService
    ) {
        service
            .getPage({ page: 1, pageSize: 5, filter: {} })
            .then((response) => this.restaurants.set(response));
    }

    async onSaveRestaurantHandler(body: SaveRestaurant) {
        await this.service.save(body);
        const meta = this.restaurants().meta;
        this.restaurants.set(await this.service.getPage({ page: meta.page, pageSize: meta.pageSize, filter: {} }))
    }
}
  