import MenuCategory from "./menu-category.class";
import Restaurant from "./restaurant.class";


export type MenuParams = {
    id: string;
    restaurant: Restaurant;
    name: string;
    categories: MenuCategory[];
}
export default class Menu {

    public id: string;
    public restaurant: Restaurant;
    public name: string;
    public categories: MenuCategory[];
    private constructor(params: MenuParams) {

        const { id, restaurant, name, categories } = params;
        this.id = id;
        this.restaurant = restaurant;
        this.name = name;
        this.categories = categories;
    }
}