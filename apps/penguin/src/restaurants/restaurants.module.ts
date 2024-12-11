import { Module } from '@nestjs/common';
import RestaurantController from './controllers/restaurant.controller';
import RestaurantService from './services/restaurant.service';
import LocalRestaurantRepository from './repositories/local-restaurant.repository';
import MenuController from './controllers/menu.controller';
import LocalMenuRepository from './repositories/local-menu.repository';
import MenuService from './services/menu.service';
import MenuCategoryService from './services/menu-category.service';
import LocalMenuCategoryRepository from './repositories/local-menu-category.repository';
import MenuCategoryController from './controllers/menu-category.controller';
import CategoryProductService from './services/category-product.service';
import LocalCategoryProductRepository from './repositories/local-category-product.repository';
import CategoryProductController from './controllers/category-product.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [
    RestaurantController,
    MenuController,
    MenuCategoryController,
    CategoryProductController,
  ],
  providers: [
    RestaurantService,
    MenuService,
    MenuCategoryService,
    CategoryProductService,
    LocalRestaurantRepository,
    LocalMenuRepository,
    LocalMenuCategoryRepository,
    LocalCategoryProductRepository,
  ],
  imports: [ProductsModule],
})
export class RestaurantsModule {}
