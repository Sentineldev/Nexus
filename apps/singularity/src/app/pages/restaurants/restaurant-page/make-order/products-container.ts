import { Component } from "@angular/core";
import ProductButton from "./product-button";

@Component({
    selector: `app-products-container`,
    styles: `
    .buttons-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(180px, auto));
        gap: 1.2rem;
        row-gap:2rem;
    }
    `,
    template: `
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 p-1">
            <label for="search" class="flex-1 flex items-center gap-2 border-b py-2 border-slate-300 cursor-text">
                <img src="/svg/search-svgrepo-com.svg" alt="search icon svg" width="24" height="24">
                <input class="outline-none w-full bg-transparent" type="search" name="search" id="search">
            </label>
            <label for="select-menu">
                <select class="hover:cursor-pointer outline-none p-3 bg-transparent" name="select-menu" id="select-menu">
                    <option value="">Seleccionar Menu</option>
                </select>
            </label>
        </div>
        <div class="buttons-container justify-start">
            <app-product-button/>
            <app-product-button/>
            <app-product-button/>
            <app-product-button/>
            <app-product-button/>
            <app-product-button/>
            
        </div>
    </div>
    `,
    imports: [ProductButton]
})
export default class ProductsContainer {

}