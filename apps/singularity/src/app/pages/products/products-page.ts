import { Component, computed, OnInit, signal } from '@angular/core';
import Paginator from "../../shared/paginator/paginator";
import ProductService from './services/product-service';
import ProductsDisplay from './components/display/products-display';
import SaveProductModal from "./components/modals/save-modal/save-product-modal";

@Component({
  selector: 'app-products-page',
  imports: [Paginator, ProductsDisplay, SaveProductModal],
  templateUrl: './products-page.html',
})
export default class ProductsPage implements OnInit {


  public state = computed(() => this.service.getState());

  constructor(private readonly service: ProductService) {}
  
  ngOnInit(): void {
    this.service.getPage(this.state().filter);
  }
  async onUpdateHandler() {
    this.service.getPage(this.state().filter);
  }

  async pageChangeHandler(page: number) {
    this.service.getPage({
      ...this.state().filter,
      page,
    });
  }

}
