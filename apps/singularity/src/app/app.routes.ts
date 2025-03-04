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
import MenuConfigPage from './pages/menu/config/config-page';
import CategoryProductSelectionPage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/products/category-product-selection-page';
import MenuCategoryConfigPage from './pages/menu-category/config/config-page';
import UsersPage from './pages/users/users-page';
import RestaurantHomePage from './pages/restaurants/restaurant-page/home-page/restaurant-home-page';
import MenuHomePage from './pages/restaurants/restaurant-page/menu-page/home-page/menu-home-page';
import MenuCategoryHomePage from './pages/restaurants/restaurant-page/menu-page/menu-category-page/home-page/menu-category-home-page';
import ClientsPage from './pages/clients/clients-page';
import MapSelectorPage from './pages/map/map';
import OrdersPage from './pages/restaurants/restaurant-page/orders-page/orders-page';
import MakeOrderPage from './pages/restaurants/restaurant-page/make-order/make-order';
import FeedStockPage from './pages/feed-stock/feed-stock.page';
import RestaurantsPage2 from './pages/restaurants-2/restaurants-page';
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
import ProductsHome from './pages/products/components/products-home';
import ProductsPage2 from './pages/products-2/products-2.page';

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
                path: "users",
                component: UsersPage
            },
            {
                path: "product-management",
                component: ProductsHome,
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
                component: RestaurantsPage,
            },
            {
                path: "restaurant/:restaurantId",
                component:  RestaurantPage2,
                children: [
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
