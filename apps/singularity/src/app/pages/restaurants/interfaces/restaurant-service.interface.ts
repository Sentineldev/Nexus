import { PageData, PageFilter } from "../../../shared/types/pagination";
import Restaurant from "../classes/restaurant.class";


export type SaveRestaurant = {
    name: string;
};

export default interface RestaurantService {

    save(restaurant: SaveRestaurant): Promise<void>
    update(id: string, restaurant: SaveRestaurant): Promise<void>
    delete(id: string): Promise<void>
    getPage(filter: PageFilter<{}>): Promise<PageData<Restaurant>>
    getById(id: string): Promise<Restaurant | undefined>

}