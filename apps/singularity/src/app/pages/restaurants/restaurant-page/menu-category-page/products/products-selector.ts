import { Component, computed, OnInit, signal } from "@angular/core";
import ProductService from "../../../../products/services/product-service";
import Product from "../../../../products/classes/product.class";
import SaveCategoryProductModal from "./save-category-product-modal";
import { SaveCategoryProduct } from "../../../dto/category-product.dto";

@Component({
    selector: `app-products-selector`,
    template: `
    
        <div class="h-full flex gap-12">
            @if (dragged()) {
                <app-save-category-product-modal (onAddedProduct)="onAddedHandler($event)" [dialogId]="dialogId()" [product]="dragged()!"/>
            }
            <div class="max-h-[700px] w-[500px] h-[700px] flex flex-col">
                <div class="bg-cyan-500 p-3 rounded-t-xl">
                    <h1 class="text-white font-sans text-[1.4rem] font-bold">Productos</h1>
                </div>
                <div class="border flex-1 flex flex-col gap-3 rounded-b-xl">
                    <div class="p-3">
                        <h1>Posible formulario aqui</h1>
                    </div>
                    <div class="flex-1">
                        @for (product of state().page.data; track product.id) {
                            <div (dragstart)="onDragStartHandler(product)" draggable="true" class="p-4 transition-all hover:bg-slate-200 cursor-pointer">
                                <p class="font-sans text-slate-700 text-[1.1rem]">{{product.name}}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div class="max-h-[700px] w-[500px] h-[700px] flex flex-col">
                <div class="bg-cyan-500 p-3 rounded-t-xl">
                    <h1 class="text-white font-sans text-[1.4rem] font-bold">Productos del menu</h1>
                </div>
                <div class="border flex-1 flex flex-col gap-3 rounded-b-xl">
                    <div class="p-3">
                        <h1>Posible formulario aqui</h1>
                    </div>
                    <div (drop)="dropHandler($event)"  (dragover)="dragOverHandler($event)" class="flex-1">
                        @for (product of state().page.data; track product.id) {
                            <div draggable="true" class="p-4 transition-all hover:bg-slate-200 cursor-pointer">
                                <p class="font-sans text-slate-700 text-[1.1rem]">{{product.name}}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [SaveCategoryProductModal]
})
export default class ProductsSelector implements OnInit {

    public dragged = signal<Product | undefined>(undefined);
    public dialogId = signal<string>("");
    

    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: ProductService
    ) {}
    ngOnInit(): void {
        this.service.getPage(this.state().filter);
    }

    onDragStartHandler(product: Product) {
        this.dragged.set(product);
        this.dialogId.set(`some-dialog-${product.id}`);
    }
    dragOverHandler(event: DragEvent) {
        const target = event.target as HTMLDivElement;
        event.preventDefault();
    }

    dropHandler(event: DragEvent) {
        event.preventDefault();

        if (this.dragged()) {
            const dialog = document.getElementById(this.dialogId()) as HTMLDialogElement;
            if (dialog) {
                dialog.showModal();
            }
        }
    }

    onAddedHandler(body: SaveCategoryProduct) {
        console.log(body);
    }

}