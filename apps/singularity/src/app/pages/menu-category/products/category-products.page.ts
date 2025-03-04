import { Component, computed, OnInit } from "@angular/core";
import CategoryProductsDisplay2 from "./display/category-products-display";
import CategoryProductPageService2 from "./category-product-page.service";
import MenuCategoryPageService2 from "../menu-category-page.service";

@Component({
    selector: `app-category-products-page`,
    template: `
    
        <div class="grid grid-cols-2 p-12 gap-6 h-full ">
            <div class="border-r px-4 border-neutral">
                @if (state().products) {
                    <app-category-products-display2 [products]="state().products!.data"/>
                }
            </div>
            <div>
                <h1>Hola mundo 2</h1>
            </div>
        </div>
    `,
    imports: [CategoryProductsDisplay2]
})
export default class CategoryProductsPage implements OnInit {

    public category = computed(() => this.pageService.getCategory());
    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: CategoryProductPageService2, 
        private readonly pageService: MenuCategoryPageService2,
    ) {}
    ngOnInit(): void {
        
        this.service.getPage({ filter: { categoryId: this.category().id }, page: 1, pageSize: 5 });
    }
}