import { Routes } from '@angular/router';
import LoginPage from './pages/login/login-page';
import IndexPage from './pages/index/index-page';
import ProductsPage from './pages/products/products-page';
import RestaurantsPage from './pages/restaurants/restaurants-page';
import RestaurantPage from './pages/restaurants/restaurant-page/restaurant-page';
import MenusPage from './pages/restaurants/restaurant-page/menus-page/menus-page';
import MenuCategoryPage from './pages/restaurants/restaurant-page/menu-category-page/menu-category.page';
import MenuPage from './pages/restaurants/restaurant-page/menu-page/menu-page';
import CategoriesPage from './pages/restaurants/restaurant-page/menu-page/categories-page/categories-page';

export const routes: Routes = [
    { path: "", component: LoginPage, children: [] },
    {
        path: "admin",
        component: IndexPage,
        children: [
            {
                path: "products",
                component: ProductsPage
            },
            {
                path: "restaurants",
                component: RestaurantsPage,
            },
            {
                path: "restaurant/:restaurantId",
                component: RestaurantPage,
                children: [
                    // {
                    //     path: "",
                    //     component: RestaurantHomePage
                    // },
                    {
                        path: "",
                        component: MenusPage,
                        
                    },
                    {
                        path: "menus",
                        component: MenusPage,
                    },
                    {
                        path: "menu/:menuId",
                        component: MenuPage,
                        children: [
                            {
                                path: "",
                                component: CategoriesPage
                            },
                            {
                                path: "category/:categoryId",
                                component: MenuCategoryPage
                            }
                        ]
                    },
                    // {
                    //     path: "menu-category/:categoryId/products",
                    //     component: MenuCategoryPage,
                    // },
                ]
            }
        ],
    }
];
