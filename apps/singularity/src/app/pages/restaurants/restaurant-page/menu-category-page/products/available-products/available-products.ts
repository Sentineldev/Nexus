import { Component, computed, OnInit } from "@angular/core";
import ProductService from "../../../../../products/services/product-service";
import ProductSelectionService from "../product-selection.service";
import Product from "../../../../../products/classes/product.class";

@Component({
    selector: `app-available-products`,
    template: `
    <div class="flex flex-col h-full">
        <div class="bg-slate-700 p-3 rounded-t-xl">
            <h1 class="text-white font-sans text-[1.2rem] font-bold">Productos disponibles</h1>
        </div>
        <div class="border flex-1 flex flex-col gap-3 rounded-b-xl">
            <div class="flex-1">
                @for (product of state().page.data; track product.id) {
                    <div (dragend)="onDragEndHandler()" (dragstart)="onDragStartHandler(product)" draggable="true" class="p-4 transition-all hover:bg-slate-200 cursor-pointer">
                        <p class="font-sans text-slate-700 text-[1.1rem]">{{product.name}}</p>
                    </div>
                }
            </div>
        </div>
    </div>

    `
})
export default class AvailableProducts implements OnInit {



    public state = computed(() => this.productService.getState());

    public selectionState = computed(() => this.selectionService.getState());
    constructor(
        private readonly productService: ProductService,
        private readonly selectionService: ProductSelectionService
    ) {}
    ngOnInit(): void {
        this.productService.getPage(this.state().filter);
    }

    onDragStartHandler(product: Product) {
        this.selectionService.onDragStart(product);
    }

    onDragEndHandler() {
       this.selectionService.onDragEnd();
    }


}