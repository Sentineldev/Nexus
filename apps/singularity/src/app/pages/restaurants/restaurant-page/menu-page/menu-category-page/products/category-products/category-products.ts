import { Component, computed, OnInit, signal } from "@angular/core";
import CategoryProductsService from "./category-products.service";
import ProductSelectionService from "../product-selection.service";
import MenuCategoryPageService from "../../menu-category-page.service";
import DisplayCategoryProduct from "./display-category-product";
import { Loader } from "../../../../../../../shared/loader/loader";

@Component({
    selector: `app-category-products`,
    template: `
    <div class="flex flex-col  h-full">
        <div class="pt-2 rounded-t-xl">
            <h1 class="text-slate-700 font-sans text-[1.2rem] font-bold text-center">Menu</h1>
        </div>
        <div class=" lg:border-slate-400 lg:border-r flex-1 flex flex-col gap-3">
            @if(state().loading){
                <app-loader [color]="'secondary'"/>
            }    
            <div (dragleave)="onDragLeaveHandler($event)" (drop)="onDropHandler($event)"  (dragover)="onDragOverHandler($event)" class="flex-1 transition-all">
                @for (product of state().page.data; track product.id) {
                    <app-display-category-product [product]="product"/>
                }
            </div>
            
        </div>
    </div>

    `,
    imports: [DisplayCategoryProduct, Loader]
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

    onUpdateHandler() {
        this.categoryProductService.refreshPage();
    }

    onDragLeaveHandler(event: DragEvent) {
        event.preventDefault();
        const target = event.target as HTMLDivElement;

        target.classList.remove("bg-slate-300");
    }

    onDragOverHandler(event: DragEvent) {
        event.preventDefault();

        const target = event.target as HTMLDivElement;
        target.classList.add("bg-slate-300");
    }

    onDropHandler(event: DragEvent) {
        event.preventDefault();
        
        const target = event.target as HTMLDivElement;

        target.classList.remove("bg-slate-300");

        this.selectionService.onDrop();

    }
}