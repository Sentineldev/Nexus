import { Component } from '@angular/core';
import Sidebar from "../../shared/sidebar/sidebar";
import ProductsPage from "../products/products-page";

@Component({
  selector: 'app-index-page',
  imports: [Sidebar, ProductsPage],
  templateUrl: './index-page.html',
})
export default class IndexPage {
}
