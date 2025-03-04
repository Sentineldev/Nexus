import { Component, computed, OnInit } from "@angular/core";
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
            <div class="grid grid-cols-2 p-12 gap-6 h-full ">
                <div class="border-r px-4 border-neutral">
                    @if (state().products) {
                        <app-category-products-display2 [products]="state().products!.data"/>
                    }
                </div>
                <div class="px-4">
                    @if (productsState().page) {
                        <app-product-options-display [products]="productsState().page.data"/>
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



    constructor(
        private readonly service: CategoryProductPageService2, 
        private readonly pageService: MenuCategoryPageService2,
        private readonly productsService: ProductService,
    ) {}

    ngOnInit(): void {
        this.service.getPage({ filter: { categoryId: this.category().id }, page: 1, pageSize: 5 });
        this.productsService.getPage(this.productsState().filter);
    }
}