import { Component, input } from "@angular/core";
import CategoryProduct from "../../../../../../classes/category-product.class";

@Component({
    selector: `app-product-fieldset-container`,
    template: `
    
    <fieldset class="border p-2 font-sans text-slate-700 rounded-lg border-slate-300">
        <legend>Producto</legend>
        <div class="flex flex-col">
            <p class="">{{product().product.name}}</p>
            <p class="text-slate-500 text-sm">{{product().isActive ? "Activo" : "Inactivo"}}</p>
        </div>
        <p class="">Precio: {{product().price}} $</p>
    </fieldset>
    `
})
export default class ProductFieldsetContainer {

    public product = input.required<CategoryProduct>();
}