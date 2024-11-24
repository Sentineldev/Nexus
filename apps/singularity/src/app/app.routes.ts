import { Routes } from '@angular/router';
import LoginPage from './pages/login/login-page';
import IndexPage from './pages/index/index-page';
import ProductsPage from './pages/products/products-page';

export const routes: Routes = [
    { path: "", component: LoginPage, children: [] },
    {
        path: "admin",
        component: IndexPage,
        children: [
            {
                path: "products",
                component: ProductsPage
            }
        ],
    }
];
