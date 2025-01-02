import { Routes } from '@angular/router';
import LoginPage from './pages/login/login-page';
import IndexPage from './pages/index/index-page';
import ProductsPage from './pages/products/products-page';
import RestaurantsPage from './pages/restaurants/restaurants-page';
import RestaurantPage from './pages/restaurants/restaurant-page/restaurant-page';
import MenusPage from './pages/restaurants/restaurant-page/menus-page/menus-page';
import MenuPage from './pages/restaurants/restaurant-page/menu-page/menu-page';
import CategoriesPage from './pages/restaurants/restaurant-page/menu-page/categories-page/categories-page';
import MenuCategoryPage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/menu-category.page';
import RestaurantConfigPage from './pages/restaurants/restaurant-page/config-page/config-page';
import MenuConfigPage from './pages/restaurants/restaurant-page/menu-page/config-page/config-page';
import CategoryProductSelectionPage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/products/category-product-selection-page';
import MenuCategoryConfigPage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/config-page/config-page';
import UsersPage from './pages/users/users-page';
import RestaurantHomePage from './pages/restaurants/restaurant-page/home-page/restaurant-home-page';
import MenuHomePage from './pages/restaurants/restaurant-page/menu-page/home-page/menu-home-page';
import MenuCategoryHomePage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/home-page/menu-category-home-page';
import ClientsPage from './pages/clients/clients-page';

export const routes: Routes = [
    { path: "", component: LoginPage, children: [] },
    {
        path: "admin",
        component: IndexPage,
        children: [
            {
                path: "",
                component: RestaurantsPage,
            },
            {
                path: "users",
                component: UsersPage
            },
            {
                path: "products",
                component: ProductsPage
            },
            {
                path: "clients",
                component: ClientsPage
            },
            {
                path: "restaurants",
                component: RestaurantsPage,
            },
            {
                path: "restaurant/:restaurantId",
                component: RestaurantPage,
                children: [
                    {
                        path: "",
                        component: RestaurantHomePage,
                        children: [
                            {
                                path: "menus",
                                component: MenusPage,
                                
                            },
                            {
                                path: "config",
                                component: RestaurantConfigPage,
                                
                            },
                        ]
                        
                    },
                    {
                        path: "menu/:menuId",
                        component: MenuPage,
                        children: [
                            {
                                path: "",
                                component: MenuHomePage,
                                children: [
                                    {
                                        path: "categories",
                                        component: CategoriesPage
                                    },
                                    {
                                        path: "config",
                                        component: MenuConfigPage
                                    },
                                ]
                            },
                            {
                                path: "category/:categoryId",
                                component: MenuCategoryPage,
                                children: [
                                    {
                                        path: "",
                                        component: MenuCategoryHomePage,
                                        children: [
                                            {
                                                path: "products",
                                                component: CategoryProductSelectionPage
                                            },
                                            {
                                                path: "config",
                                                component: MenuCategoryConfigPage
                                            }
                                        ]
                                    },
                                    
                                ]
                            }
                        ]
                    },
                ]
            }
        ],
    }
];
