import MenuCategory from '../classes/menu-category.class';

export default interface MenuCategoryRepository {
  save(body: MenuCategory): Promise<void>;
  update(body: MenuCategory): Promise<void>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<MenuCategory | undefined>;
  getByName(menuId: string, name: string): Promise<MenuCategory | undefined>;
}
