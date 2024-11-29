import MenuCategory from "./menu-category.class";
import Restaurant from "./restaurant.class";

export type MenuParams = {
    id: string;
    name: string;
    restaurant: Restaurant;
    categories: MenuCategory[];
};
export default class Menu {

    public id: string;
    public name: string;
    public restaurant: Restaurant;
    public categories: MenuCategory[];



    constructor({ id, name, restaurant, categories }: MenuParams) {
        this.id = id;
        this.name = name;
        this.restaurant = restaurant;
        this.categories = categories;
    }
}