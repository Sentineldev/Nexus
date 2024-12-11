import { Injectable } from '@nestjs/common';
import { MENU_CATEGORIES } from '../../shared/data';
import MenuCategory from '../classes/menu-category.class';
import MenuCategoryRepository from '../interfaces/menu-category-repository.interface';

@Injectable()
export default class LocalMenuCategoryRepository
  implements MenuCategoryRepository
{
  save(body: MenuCategory): Promise<void> {
    MENU_CATEGORIES.push(body);
    return;
  }
  update(body: MenuCategory): Promise<void> {
    const index = MENU_CATEGORIES.findIndex((val) => val.id === body.id);

    MENU_CATEGORIES[index] = body;
    return;
  }
  delete(id: string): Promise<void> {
    const index = MENU_CATEGORIES.findIndex((val) => val.id === id);

    MENU_CATEGORIES.splice(index, 1);

    return;
  }
  getById(id: string): Promise<MenuCategory | undefined> {
    const result = MENU_CATEGORIES.find((val) => val.id === id);

    return new Promise((resolve) => resolve(result));
  }

  getByName(menuId: string, name: string): Promise<MenuCategory | undefined> {
    const result = MENU_CATEGORIES.find(
      (val) => val.menu.id === menuId && val.name === name,
    );

    return new Promise((resolve) => resolve(result));
  }
}
