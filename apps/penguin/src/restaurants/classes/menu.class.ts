import Restaurant from './restaurant.class';

export type MenuCategoriesShort = {
  id: string;
  name: string;
};

export type MenuParams = {
  id: string;
  name: string;
  restaurant: Restaurant;
  categories: MenuCategoriesShort[];
};
export type NewMenuParams = {
  id: string;
  name: string;
  restaurant: Restaurant;
};

export default class Menu {
  public id: string;
  public name: string;
  public restaurant: Restaurant;
  public categories: MenuCategoriesShort[];

  private constructor({ id, name, restaurant, categories }: MenuParams) {
    this.id = id;
    this.name = name;
    this.restaurant = restaurant;
    this.categories = categories;
  }

  static Menu(params: MenuParams) {
    return new this(params);
  }
  static NewMenu(params: NewMenuParams) {
    return new this({
      ...params,
      categories: [],
    });
  }
}
