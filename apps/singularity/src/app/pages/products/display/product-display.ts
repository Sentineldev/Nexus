import { Component, input } from '@angular/core';
import Product from '../classes/product.class';

@Component({
  selector: 'app-product-display',
  imports: [],
  template: `
    <div class="grid grid-cols-2 p-3">
        <div>
            <p class="font-sans text-slate-700 text-[1.2rem]">{{ product().name }}</p>
        </div>
        <div>
            <p class="font-sans text-slate-700 text-[1.2rem]">{{ product().description }}</p>
        </div>
    </div>
  `
})
export default class ProductDisplay {


    public product = input<Product>({
        description: "",
        id: "",
        name: ''
    });


}
