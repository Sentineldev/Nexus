import { Observable } from "rxjs";
import { PageData, PageFilter } from "../types/pagination";
import Restaurant from "../classes/restaurant.class";
import { IsActiveValues } from "../types/globa";

export type SaveRestaurant = {
    name: string;
}

export type UpdateRestaurant = {
    name: string;
    isActive: IsActiveValues;
}

export default interface RestaurantRepository {
    save(body: SaveRestaurant): Observable<string>
    update(id: string, body: UpdateRestaurant): Observable<string>
    getById(id: string): Observable<Restaurant | undefined>
    getPage(filter: PageFilter<{}>): Observable<PageData<Restaurant>>

}