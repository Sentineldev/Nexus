import { Component, computed, OnInit, signal } from "@angular/core";
import CategoryProductsDisplay2 from "./display/category-products-display";
import CategoryProductPageService2 from "./category-product-page.service";
import MenuCategoryPageService2 from "../menu-category-page.service";
import { Loader } from "../../../components/loader/loader";
import ProductOptionsDisplay from "./display/products-display";
import ProductsPageService2 from "../../product-management/products/products-page2.service";

@Component({
    selector: `app-category-products-page`,
    template: `
        
        
        <div class="flex flex-col gap-8 p-12 h-full overflow-auto">
            <div class="gap-4">
                @if (state().loading || productsState().loading) {
                        <div class="py-4 px-2">
                            <app-loader color="secondary"/>
                        </div>
                }
                <div class="w-fit">
                    <button (click)="onShowProductsHandler()" type="button" class="btn">Agregar producto</button>
                </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-6 flex-1 transition-all overflow-auto">
                <div [className]="showProducts() ? ' pr-4  border-b lg:border-b-0 lg:border-r border-neutral flex flex-col gap-8' : 'pr-4 border-neutral col-span-3 flex flex-col gap-8'">
                    <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-full">
                        <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                        <input type="text" name="search-in-menu" id="search-in-menu" class="outline-none w-full" placeholder="Buscar en el menu... ">
                    </div>
                    @if (state().products) {
                        <app-category-products-display2 [products]="state().products!.data"/>
                    }
                </div>
                @if (showProducts()) {
                    <div class="flex flex-col gap-8">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-full">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="search-product" id="search-product" class="outline-none" placeholder="Buscar productos... ">
                        </div>
                        @if (productsState().products) {
                            <app-product-options-display [products]="productsState().products!.data"/>
                        }
                    </div>
                }
            </div>
        </div>
    `,
    imports: [CategoryProductsDisplay2, Loader, ProductOptionsDisplay]
})
export default class CategoryProductsPage implements OnInit {

    public category = computed(() => this.pageService.getCategory());
    public state = computed(() => this.service.getState());
    public productsState = computed(() => this.productsService.getState());


    public showProducts = signal(false);


    constructor(
        private readonly service: CategoryProductPageService2, 
        private readonly pageService: MenuCategoryPageService2,
        private readonly productsService: ProductsPageService2,
    ) {}

    ngOnInit(): void {
        this.service.getPage({ filter: { categoryId: this.category().id }, page: 1, pageSize: 10 });
        this.productsService.getPage({ ...this.productsState().filter, pageSize: 10, });
    }

    onShowProductsHandler() {
        this.showProducts.update((current) => !current);
    }
}