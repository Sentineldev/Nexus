import { Component, input } from '@angular/core';
import Product from '../classes/product.class';
import ProductDisplay from './product-display';

@Component({
  selector: 'app-products-display',
  imports: [ProductDisplay],
  template: `
    <div>
        <div class="grid grid-cols-2 bg-cyan-500 p-3 rounded-t">
            <div>
                <h1 class="text-[1.2rem] text-white font-sans">Nombre</h1>
            </div>
            <div>
                <h1 class="text-[1.2rem] text-white font-sans">Descripcion</h1>
            </div>
        </div>
        <div class="flex flex-col  border border-t-0 rounded-b overflow-auto h-[400px] max-h-[400px]">
            @for (product of products(); track product.id) {
                <app-product-display [product]="product"/>
            }
        </div>
    </div>    
  `
})
export default class ProductsDisplay {


    public products = input<Product[]>([]);


}
