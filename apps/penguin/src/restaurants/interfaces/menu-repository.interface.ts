import Menu from '../classes/menu.class';

export default interface MenuRepository {
  save(body: Menu): Promise<void>;
  delete(id: string): Promise<void>;
  update(body: Menu): Promise<void>;
  getById(id: string): Promise<Menu | undefined>;
  getByName(restaurantId: string, name: string): Promise<Menu | undefined>;
  getAll(restaurantId: string): Promise<Menu[]>;
}
