import { Component, computed, signal } from '@angular/core';
import Paginator from "../../shared/paginator/paginator";
import ProductsDisplay from "./display/products-display";
import SaveProductForm from './forms/save-product-form';
import { SaveProduct } from './dto/product.dto';
import ProductService from './services/product-service';

@Component({
  selector: 'app-products-page',
  imports: [SaveProductForm, Paginator, ProductsDisplay],
  templateUrl: './products-page.html',
})
export default class ProductsPage {


  public state = computed(() => this.service.getState());

  constructor(private readonly service: ProductService) {}


  async onSaveProduct(product: SaveProduct) {
    this.service.save(product);
  }

  async pageChangeHandler(page: number) {
    this.service.getPage({
      ...this.state().filter,
      page,
    });
  }

}
