import { Component, EventEmitter, input, Output } from '@angular/core';
import ProductDisplay from './product-display';
import Product from '../../classes/product.class';

@Component({
  selector: 'app-products-display',
  imports: [ProductDisplay],
  template: `
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-3 text-slate-700 p-3 border-b">
            <div>
                <h1 class="text-[1.2rem] font-sans font-bold">Nombre</h1>
            </div>
            <div>
                <h1 class="text-[1.2rem] font-sans font-bold">Descripcion</h1>
            </div>
        </div>
        @if (products().length !== 0) {
            <div class="flex flex-col gap-4  overflow-auto  max-h-[700px]">
                @for (product of products(); track product.id) {
                    <app-product-display [product]="product"/>
                }
            </div>
        } 
        @else {
            <p class="text-slate-700 font-sans text-lg py-4">No se han registrado productos</p>
        }
    </div>    
  `
})
export default class ProductsDisplay {


    public products = input<Product[]>([]);

}
