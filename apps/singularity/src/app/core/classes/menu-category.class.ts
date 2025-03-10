import Menu from "./menu.class";

export type MenuCategoryParams = {
    id: string;
    name: string;
    menu: Menu;
    isActive: boolean;
};
export default class MenuCategory {

    
    public id: string;
    public name: string;
    public menu: Menu;
    public isActive: boolean;

    constructor({ id, menu, name, isActive }: MenuCategoryParams) {

        this.id = id;
        this.menu = menu;
        this.name = name;
        this.isActive = isActive;
    }
}