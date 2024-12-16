import { Observable } from "rxjs";
import { SaveRestaurant } from "../dto/restaurant.dto";
import { PageData, PageFilter } from "../../../shared/types/pagination";
import Restaurant from "../classes/restaurant.class";

export default interface RestaurantRepository {
    save(body: SaveRestaurant): Observable<string>
    getById(id: string): Observable<Restaurant | undefined>
    getPage(filter: PageFilter<{}>): Observable<PageData<Restaurant>>

}