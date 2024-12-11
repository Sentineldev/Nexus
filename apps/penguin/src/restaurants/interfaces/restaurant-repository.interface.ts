import { PageData, PageFilter } from '../../shared/types/pagination';
import Restaurant from '../classes/restaurant.class';

export default interface RestaurantRepository {
  save(body: Restaurant): Promise<void>;
  delete(id: string): Promise<void>;
  update(body: Restaurant): Promise<void>;

  getById(id: string): Promise<Restaurant | undefined>;
  getByName(name: string): Promise<Restaurant | undefined>;
  getPage(filter: PageFilter<object>): Promise<PageData<Restaurant>>;
}
