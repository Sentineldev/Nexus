import Product from "../pages/products/classes/product.class";
import CategoryProduct from "../pages/restaurants/classes/category-product.class";
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
        name: "Restaurante Concorde",
        isActive: true,
    }, 
    {
        id: "2",
        name: "Restaurante Marea",
        isActive: false,
    }
];

export let MENU_ARRAY: Menu[] = [
    {
        id: "1",
        isActive: true,
        name: "Bebidas",
        restaurant: RESTAURANTS[0],
    }
];

export let MENU_CATEGORIES: MenuCategory[] = [
    {
        id: "1",
        menu: MENU_ARRAY[0],
        name: "Sopas",
        isActive: true,
    }
];


export let CATEGORY_PRODUCTS: CategoryProduct[] = [];



