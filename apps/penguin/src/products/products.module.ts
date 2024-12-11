import { Module } from '@nestjs/common';
import ProductsController from './products.controller';
import LocalProductRepository from './local-product.repository';
import ProductsService from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [LocalProductRepository, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
