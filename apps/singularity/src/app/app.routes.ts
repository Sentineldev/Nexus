import { Routes } from '@angular/router';
import LoginPage from './pages/login/login-page';
import MenuConfigPage from './pages/menu/config/config-page';
import MenuCategoryConfigPage from './pages/menu-category/config/config-page';
import ClientsPage from './pages/clients/clients-page';
import MapSelectorPage from './pages/map/map';
import RestaurantsPage2 from './pages/restaurants/restaurants-page';
import AppIndex from './pages/main';
import RestaurantPage2 from './pages/restaurant/restaurant.page';
import RestaurantHomePage2 from './pages/restaurant/home/home.page';
import RestaurantMenusPage from './pages/restaurant/menus/menus.page';
import RestaurantConfigPage from './pages/restaurant/config/config-page';
import MenuPage2 from './pages/menu/menu.page';
import MenuHomePage2 from './pages/menu/home/home.page';
import CategoriesPage2 from './pages/menu/categories/categories.page';
import MenuCategoryPage2 from './pages/menu-category/menu-category.page';
import MenuCategoryHomePage2 from './pages/menu-category/home/home.page';
import CategoryProductsPage from './pages/menu-category/products/category-products.page';
import MakeOrderPage from './pages/make-order/make-order';
import UsersPage from './pages/user-management/users/users-page';
import UserManagementHomePage from './pages/user-management/home.page';
import FeedStockPage from './pages/product-management/feed-stock/feed-stock.page';
import ProductManagementHomePage from './pages/product-management/home.page';
import ProductsPage2 from './pages/product-management/products/products-2.page';
import EmployeesPage from './pages/user-management/employees/employees.page';

export const routes: Routes = [
    { path: "", component: LoginPage, children: [] },
    {
        path: "admin",
        component: AppIndex,
        children: [
            // {
            //     path: "",
            //     component: RestaurantsPage,
            // },
            {
                path: "restaurants",
                component: RestaurantsPage2,
            },
            {
                path: "map",
                component: MapSelectorPage,
            },
            {
                path: "user-management",
                component: UserManagementHomePage,
                children: [
                    {
                        path: "users",
                        component: UsersPage
                    },
                    {
                        path: "employees",
                        component: EmployeesPage
                    }
                ]
            },
            {
                path: "product-management",
                component: ProductManagementHomePage,
                children: [
                    {
                        path: "products",
                        component: ProductsPage2,
                    },
                    {
                        path: "feed-stock",
                        component: FeedStockPage,
                    }
                ]
            },
            {
                path: "clients",
                component: ClientsPage
            },
            {
                path: "restaurants",
                component: RestaurantsPage2,
            },
            {
                path: "restaurant/:restaurantId",
                component:  RestaurantPage2,
                children: [
                    {
                        path: "make-order",
                        component: MakeOrderPage,
                    },
                    {
                        path: "",
                        component: RestaurantHomePage2,
                        children: [
                            {
                                path: "menus",
                                component: RestaurantMenusPage
                            },
                            {
                                path: "config",
                                component: RestaurantConfigPage
                            }
                        ]
                    },
                    {
                        path: "menu/:menuId",
                        component: MenuPage2,
                        children: [
                            {
                                path: "",
                                component: MenuHomePage2,
                                children: [
                                    {
                                        path: "categories",
                                        component: CategoriesPage2,
                                    },
                                    {
                                        path: "config",
                                        component: MenuConfigPage,
                                    }
                                ]
                            },
                            {
                                path: "category/:categoryId",
                                component: MenuCategoryPage2,
                                children: [
                                    {
                                        path: "",
                                        component: MenuCategoryHomePage2,
                                        children: [
                                            {
                                                path: "config",
                                                component: MenuCategoryConfigPage,
                                            },
                                            {
                                                path: "products",
                                                component: CategoryProductsPage,
                                            },
                                        ],
                                    }
                                ],
                            }
                        ]
                    }
                ]
            }
            // {
            //     path: "restaurant/:restaurantId",
            //     component: RestaurantPage,
            //     children: [
            //         {
            //             path: "make-order",
            //             component: MakeOrderPage
            //         },
            //         {
            //             path: "home",
            //             component: RestaurantHomePage,
            //             children: [
            //                 {
            //                     path: "menus",
            //                     component: MenusPage,
                                
            //                 },
            //                 {
            //                     path: "orders",
            //                     component: OrdersPage
            //                 },
            //                 {
            //                     path: "config",
            //                     component: RestaurantConfigPage,
                                
            //                 },
            //             ]
                        
            //         },
            //         {
            //             path: "menu/:menuId",
            //             component: MenuPage,
            //             children: [
            //                 {
            //                     path: "",
            //                     component: MenuHomePage,
            //                     children: [
            //                         {
            //                             path: "categories",
            //                             component: CategoriesPage
            //                         },
            //                         {
            //                             path: "config",
            //                             component: MenuConfigPage
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     path: "category/:categoryId",
            //                     component: MenuCategoryPage,
            //                     children: [
            //                         {
            //                             path: "",
            //                             component: MenuCategoryHomePage,
            //                             children: [
            //                                 {
            //                                     path: "products",
            //                                     component: CategoryProductSelectionPage
            //                                 },
            //                                 {
            //                                     path: "config",
            //                                     component: MenuCategoryConfigPage
            //                                 }
            //                             ]
            //                         },
                                    
            //                     ]
            //                 }
            //             ]
            //         },
            //     ]
            // }
        ],
    }
];
