import Product from "../pages/products/classes/product.class";
import MenuCategory from "../pages/restaurants/classes/menu-category.class";
import Menu from "../pages/restaurants/classes/menu.class";
import Restaurant from "../pages/restaurants/classes/restaurant.class";

export let PRODUCTS: Product[] = [
    {
        description: "Some description",
        id: "1",
        name: "Some name"
    }
];

export let RESTAURANTS: Restaurant[] = [
    {
        id: "1",
        name: "Restaurante Concorde"
    }, 
    {
        id: "2",
        name: "Restaurante Marea"
    }
];

export let MENU_ARRAY: Menu[] = [
    {
        id: "1",
        categories: [],
        name: "Bebidas",
        restaurant: RESTAURANTS[0],
    }
];

export let MENU_CATEGORIES: MenuCategory[] = [
    {
        id: "1",
        menu: MENU_ARRAY[0],
        name: "Sopas"
    }
];




