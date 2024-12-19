import { Component, OnInit, computed } from "@angular/core";
import Product from "../../../../../../products/classes/product.class";
import ProductService from "../../../../../../products/services/product-service";
import ProductSelectionService from "../product-selection.service";


@Component({
    selector: `app-available-products`,
    template: `
    <div class="flex flex-col h-full ">
        <div class=" p-2 rounded-t-xl">
            <h1 class="text-slate-700 font-sans text-[1.2rem] font-bold text-center">Inventario</h1>
        </div>
        <div class="flex-1 flex flex-col gap-3">
            <div class="flex-1">
                @for (product of state().page.data; track $index) {
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