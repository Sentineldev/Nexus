import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap, tap } from "rxjs";
import Restaurant from "../classes/restaurant.class";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import { SaveRestaurant } from "../dto/restaurant.dto";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";


@Injectable({
    providedIn: 'root'
})
export default class LocalRestaurantRepository implements RestaurantRepository {


    private restaurants: Restaurant[];


    constructor() {

        this.restaurants = [
            {
                id: "1",
                name: "Restaurante Concorde"
            }, 
            {
                id: "2",
                name: "Restaurante Marea"
            }
        ];
    }
    getById(id: string): Observable<Restaurant | undefined> {
        return of(this.restaurants.find((val) => val.id === id));
    }


    save(body: SaveRestaurant): Observable<string> {
        const id = new Date().getTime().toString();
        const newRestaurant = new Restaurant(id, body.name);

        return this.getById(id)
        .pipe(
            switchMap((val) => {
                if (val) {
                    return "Already exists";
                }
                return of(newRestaurant).pipe(
                    tap(() => this.restaurants.push(newRestaurant)),
                    map(() => "Created")
                )
            })
        )
    }


    getPage(filter: PageFilter<{}>): Observable<PageData<Restaurant>> {
       

        return of({ status: 200 }).pipe(map(() => {

            const start = (filter.page - 1) * filter.pageSize;
            const end = start + filter.pageSize;
    
            const data = this.restaurants.slice(start, end)
            const dataSize = this.restaurants.length;
    
            const pageData: PageData<Restaurant> = {
                data: data,
                meta: {
                    dataSize: dataSize,
                    page: filter.page,
                    pageSize: filter.pageSize,
                }
            }
            return pageData;
        }));
    }

}