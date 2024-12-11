import Menu from './menu.class';

export type MenuCategoryParams = {
  id: string;
  name: string;
  menu: Menu;
};

export default class MenuCategory {
  public id: string;
  public name: string;
  public menu: Menu;

  constructor({ id, menu, name }: MenuCategoryParams) {
    this.id = id;
    this.menu = menu;
    this.name = name;
  }
}
