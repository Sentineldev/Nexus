import { Component, computed, OnInit } from "@angular/core";
import CategoryProductsService from "./category-products.service";
import ProductSelectionService from "../product-selection.service";
import MenuCategoryPageService from "../../menu-category-page.service";

@Component({
    selector: `app-category-products`,
    template: `
    <div class="flex flex-col  h-full">
        <div class="bg-slate-700 p-3 rounded-t-xl">
            <h1 class="text-white font-sans text-[1.2rem] font-bold">Productos del menu</h1>
        </div>
        <div class="border flex-1 flex flex-col gap-3 rounded-b-xl">
            <div (dragleave)="onDragLeaveHandler($event)" (drop)="onDropHandler($event)"  (dragover)="onDragOverHandler($event)" class="flex-1 transition-all">
                @for (product of state().page.data; track product.id) {
                    <div class="p-4 flex items-center hover:bg-slate-200 transition-all hover:cursor-pointer">
                        <p class="font-sans text-slate-700 text-[1.3rem] flex-1">{{product.product.name}}</p>
                        <p class="font-nsas text-slate-700 text-[1.3rem] font-bold">{{product.price}} $</p>
                    </div>
                }
            </div>
        </div>
    </div>

    `
})
export default class CategoryProducts implements OnInit {

    public state = computed(() => this.categoryProductService.getState());
    public category = computed(() => this.categoryPageService.getCategory());

    constructor(
        private readonly categoryProductService: CategoryProductsService,
        private readonly selectionService: ProductSelectionService,
        private categoryPageService: MenuCategoryPageService,
    ) {}
    ngOnInit(): void {

        const categoryId = this.category().id;
        this.categoryProductService.getPage({
            ...this.state().filter,
            filter: { ...this.state().filter.filter, categoryId }
        });
    }


    onDragLeaveHandler(event: DragEvent) {
        event.preventDefault();
        const target = event.target as HTMLDivElement;

        target.classList.remove("bg-slate-100");
    }

    onDragOverHandler(event: DragEvent) {
        event.preventDefault();

        const target = event.target as HTMLDivElement;
        target.classList.add("bg-slate-100");
    }

    onDropHandler(event: DragEvent) {
        event.preventDefault();
        
        const target = event.target as HTMLDivElement;

        target.classList.remove("bg-slate-100");

        this.selectionService.onDrop();

    }
}