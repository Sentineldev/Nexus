import { Component, computed, OnInit, signal } from "@angular/core";
import CategoryProductsDisplay2 from "./display/category-products-display";
import CategoryProductPageService2 from "./category-product-page.service";
import MenuCategoryPageService2 from "../menu-category-page.service";
import { Loader } from "../../../shared/loader/loader";
import ProductService from "../../products/services/product-service";
import ProductOptionsDisplay from "./display/products-display";

@Component({
    selector: `app-category-products-page`,
    template: `
        @if (state().loading || productsState().loading) {
            <div class="p-12">
                <app-loader color="secondary"/>
            </div>
        }
        @if (!state().loading && !productsState().loading) {
            <div class="flex flex-col gap-8 p-12 h-full">
                <div class="w-fit">
                    <button (click)="onShowProductsHandler()" type="button" class="btn">Agregar producto</button>
                </div>
                <div class="grid grid-cols-3 gap-6 h-full transition-all">

                    <div [className]="showProducts() ? ' pr-4 border-r border-neutral col-span-2 flex flex-col gap-8' : 'pr-4 border-neutral col-span-3 flex flex-col gap-8'">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-[300px]">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="" id="" class="outline-none" placeholder="Buscar en el menu... ">
                        </div>
                        @if (state().products) {
                            <app-category-products-display2 [products]="state().products!.data"/>
                        }
                    </div>
                    @if (showProducts()) {
                        <div class="flex flex-col gap-8">
                            <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-full">
                                <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                                <input type="text" name="" id="" class="outline-none" placeholder="Buscar productos... ">
                            </div>
                            @if (productsState().page) {
                                <app-product-options-display [products]="productsState().page.data"/>
                            }
                        </div>
                    }
                </div>
            </div>
        }
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
        private readonly productsService: ProductService,
    ) {}

    ngOnInit(): void {
        this.service.getPage({ filter: { categoryId: this.category().id }, page: 1, pageSize: 5 });
        this.productsService.getPage(this.productsState().filter);
    }

    onShowProductsHandler() {
        this.showProducts.update((current) => !current);
    }
}