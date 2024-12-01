import { Component, computed } from "@angular/core";
import ProductService from "../../../../../products/services/product-service";
import CategoryProductsService from "./category-products.service";
import ProductSelectionService from "../product-selection.service";

@Component({
    selector: `app-category-products`,
    template: `
    <div class="max-h-[700px] w-[500px] h-[700px] flex flex-col">
        <div class="bg-cyan-500 p-3 rounded-t-xl">
            <h1 class="text-white font-sans text-[1.4rem] font-bold">Productos del menu</h1>
        </div>
        <div class="border flex-1 flex flex-col gap-3 rounded-b-xl">
            <div (drop)="onDropHandler($event)"  (dragover)="onDragOverHandler($event)" class="flex-1">
                @for (product of state().page.data; track product.id) {
                    <div class="p-4 flex items-center">
                        <p class="font-sans text-slate-700 text-[1.1rem] flex-1">{{product.product.name}}</p>
                        <p>{{product.price}} $</p>
                    </div>
                }
            </div>
        </div>
    </div>

    `
})
export default class CategoryProducts {

    public state = computed(() => this.categoryProductService.getState());
    constructor(
        private readonly categoryProductService: CategoryProductsService,
        private readonly selectionService: ProductSelectionService,
    ) {}


    onDragOverHandler(event: DragEvent) {
        event.preventDefault();
    }

    onDropHandler(event: DragEvent) {
        event.preventDefault();
        this.selectionService.onDrop();

    }
}