import Menu from "./menu.class";

export type MenuCategoryParams = {
    id: string;
    menu: Menu;
    name: string;
    // products: MenuProduct[];
}
export default class MenuCategory {

    public id: string;
    public menu: Menu;
    public name: string;
    // public products: MenuProduct[];

    constructor(params: MenuCategoryParams) {

        const { id, menu, name } = params;
        this.id = id;
        this.menu = menu;
        this.name = name;
        // this.products = products;
    }
}