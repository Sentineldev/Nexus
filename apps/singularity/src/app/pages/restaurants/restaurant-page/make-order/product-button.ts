import { Component } from "@angular/core";

@Component({
    selector: `app-product-button`,
    template: `
    <button class=" h-48 max-h-48 bg flex flex-col hover:opacity-90 transition-all ">
        <div class="h-[70%]">
            <img class="rounded-t-lg w-full h-full" src="/imgs/product-placeholder.jpg" alt="Product image">
        </div>                        
        <div class="text-start p-2 rounded-b-lg bg-white h-full max-h-full">
            <p class="line-clamp-2 text-[0.9rem] text-slate-700">Sopa de patatas fritas</p>
            <p class="font-bold">3.60 $</p>
        </div>
    </button>

    `
})
export default class ProductButton {

}