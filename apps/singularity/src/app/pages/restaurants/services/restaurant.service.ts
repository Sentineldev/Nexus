import { Injectable, signal, WritableSignal } from "@angular/core";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import Restaurant from "../classes/restaurant.class";
import { of } from "rxjs";
import { SaveRestaurant } from "../dto/restaurant.dto";

type RestaurantStateProps = {

    restaurants: Restaurant[];
    page: PageData<Restaurant>
    filter: PageFilter<{}>
};

@Injectable({
    providedIn: "root"
})
export default class RestaurantService {


    private state: WritableSignal<RestaurantStateProps>;


    constructor() {

        const data = [{
            id: "1",
            name: "Restaurante Concorde"
        },
        {
            id: "2",
            name: "Restaurante Marea"
        }]; 

        this.state = signal<RestaurantStateProps>({
            restaurants: data,
            page: {
                data: [],
                meta: {
                    dataSize: 0,
                    page: 1,
                    pageSize: 5,
                },
            },
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            }
        });
        this.getPage(this.state().filter);
    }


    getState() {
        return this.state();
    }

    save(body: SaveRestaurant) {

        const id = new Date().getTime().toString();
        const newRestaurant = new Restaurant(id, body.name);
        of({ status: 201 }).subscribe(() => {
            this.state.update((current) => ({...current, products: [...current.restaurants, newRestaurant]}));
            this.getPage(this.state().filter);
        });
    }

    getPage(filter: PageFilter<{}>) {
        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;

        const data = this.state().restaurants.slice(start, end)
        const dataSize = this.state().restaurants.length;

        const pageData = {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }
        of(pageData).subscribe((result) => {
            this.state.update((current): RestaurantStateProps => {
                return { ...current, page: result, filter: filter };
            });
        });
    }

}