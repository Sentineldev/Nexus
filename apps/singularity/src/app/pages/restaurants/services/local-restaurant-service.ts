import { Injectable } from "@angular/core";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Restaurant from "../classes/restaurant.class";
import RestaurantService, { SaveRestaurant } from "../interfaces/restaurant-service.interface";


@Injectable({
    providedIn: "root"
})
export default class LocalRestaurantService implements RestaurantService {

    private restaurants: Restaurant[];
    constructor() {
        this.restaurants = [
            {
                id: "1",
                name: "Restaurante Marea"
            },
            {
                id: "2",
                name: "Restaurante Concorde"
            }
        ];
    }

    private async getById(id: string): Promise<Restaurant | undefined> {

        return this.restaurants.find((val) => val.id === id);
    }

    private async getIndexById(id: string): Promise<number> {

        return this.restaurants.findIndex((val) => val.id === id);
    }

    async save(restaurant: SaveRestaurant): Promise<void> {

        const newRestaurant = new Restaurant(new Date().getTime().toString(),restaurant.name);
        const exists = await this.getById(newRestaurant.id);
        if (exists) {
            throw new Error("Restaurant already exists");
        }
        this.restaurants = [...this.restaurants, newRestaurant];
    }
    async update(id: string, restaurant: SaveRestaurant): Promise<void> {
        const index = await this.getIndexById(id);

        if (index === -1) {
            throw new Error("Restaurant not found");
        }
        this.restaurants[index].name = restaurant.name;
    }
    async delete(id: string): Promise<void> {
        this.restaurants = this.restaurants.filter((val) => val.id !== id);
    }
    async getPage(filter: PageFilter<{}>): Promise<PageData<Restaurant>> {
        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;
        const data = this.restaurants.slice(start, end)

        const dataSize = this.restaurants.length;
        return {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }
    }
}