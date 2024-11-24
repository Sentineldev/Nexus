import { Component, signal } from '@angular/core';
import LocalProductService from './services/product.service';
import Product from './classes/product.class';
import ProductForm from './forms/product-form';
import { SaveProduct } from './interfaces/product-service.interface';
import { PageData } from '../../shared/types/pagination';
import Paginator from "../../shared/paginator/paginator";
import ProductsDisplay from "./display/products-display";

@Component({
  selector: 'app-products-page',
  imports: [ProductForm, Paginator, ProductsDisplay],
  templateUrl: './products-page.html',
})
export default class ProductsPage {

  products = signal<PageData<Product>>({
    data: [],
    meta: {
      dataSize: 0,
      page: 1,
      pageSize: 5,
    }
  });

  constructor(
    private readonly service: LocalProductService
  ) {}



  async onSaveProduct(product: SaveProduct) {
    await this.service.save(product);

    this.products.set(await this.service.getPage({
      page: this.products().meta.page,
      pageSize: this.products().meta.pageSize, 
      filter: {}
    }))
  }

  async pageChangeHandler(page: number) {

    const meta = this.products().meta;
    const newPage = await this.service.getPage({
      page: page,
      pageSize: meta.pageSize,
      filter: {}
    })
    this.products.set(newPage)
  }

}
