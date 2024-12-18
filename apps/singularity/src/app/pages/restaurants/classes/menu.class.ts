import Restaurant from "./restaurant.class";

export type MenuParams = {
    id: string;
    name: string;
    restaurant: Restaurant;
    isActive: boolean;
};
export default class Menu {

    public id: string;
    public name: string;
    public restaurant: Restaurant;
    public isActive: boolean;



    constructor({ id, name, restaurant, isActive }: MenuParams) {
        this.id = id;
        this.name = name;
        this.restaurant = restaurant;
        this.isActive = isActive;
    }
}
