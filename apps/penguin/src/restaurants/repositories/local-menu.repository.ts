import { Injectable } from '@nestjs/common';
import MenuRepository from '../interfaces/menu-repository.interface';
import Menu from '../classes/menu.class';
import { MENU_CATEGORIES, MENUS } from '../../shared/data';

@Injectable()
export default class LocalMenuRepository implements MenuRepository {
  save(body: Menu): Promise<void> {
    MENUS.push(body);
    return;
  }
  delete(id: string): Promise<void> {
    const index = MENUS.findIndex((val) => val.id === id);
    MENUS.splice(index, 1);
    return;
  }
  update(body: Menu): Promise<void> {
    const index = MENUS.findIndex((val) => val.id === body.id);
    MENUS[index] = body;
    return;
  }
  getById(id: string): Promise<Menu | undefined> {
    const result = MENUS.find((val) => val.id === id);

    result.categories = MENU_CATEGORIES.filter((val) => val.menu.id === id).map(
      (val) => ({ id: val.id, name: val.name }),
    );

    return new Promise((resolve) => resolve(result));
  }

  getByName(restaurantId: string, name: string): Promise<Menu | undefined> {
    const result = MENUS.find(
      (val) => val.restaurant.id === restaurantId && val.name === name,
    );
    return new Promise((resolve) => resolve(result));
  }

  getAll(restaurantId: string): Promise<Menu[]> {
    const result = MENUS.filter((val) => val.restaurant.id === restaurantId);

    result.map((val) => {
      val.categories = MENU_CATEGORIES.filter(
        (aux) => aux.menu.id === val.id,
      ).map((aux2) => ({ id: aux2.id, name: aux2.name }));

      return val;
    });
    return new Promise((resolve) => resolve(result));
  }
}
