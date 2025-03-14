import { Component, computed, OnInit, signal } from "@angular/core";
import ProductsPageService2 from "./products-page2.service";
import ProductsDisplay2 from "./display/products-display";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import { Loader } from "../../../components/loader/loader";
import CreateProductModal2 from "./modals/create-product-modal";
import Paginator from "../../../components/paginator/paginator";

@Component({
    selector: `app-products-page2`,
    template: `

   
    <div class="p-12 flex flex-col h-full overflow-auto">
        <app-create-product-modal2 [dialogId]="dialogId()"/>
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        @if(!state().loading && state().products) {
            <div class="flex flex-col gap-4">
                <div class="flex gap-8">
                    <div class="flex-1">
                        <div class="search-bar">
                            <img src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="search" id="search" placeholder="Buscar producto...">
                        </div>
                    </div>
                    <div>
                        <app-dialog-toggler [dialogId]="dialogId()">
                            <div class="btn">
                                Crear producto
                            </div>
                        </app-dialog-toggler>
                    </div>
                </div>
                <app-products-display2 [products]="state().products!.data"/>
                <div class="flex items-center justify-center">
                    <app-paginator 
                    [defaultPage]="state().products!.meta.page" 
                    (pageChangeEvent)="onPageChange($event)" 
                    [dataSize]="state().products!.meta.dataSize" 
                    [pageSize]="state().products!.meta.pageSize"/>
                </div>
            </div>
        }
    </div>
    `,
    imports: [ProductsDisplay2, DialogToggler, Loader, CreateProductModal2, Paginator]
})
export default class ProductsPage2 implements OnInit {


    public dialogId = signal<string>("create-product-modal");
    public state = computed(() => this.service.getState());
    constructor(
        private readonly service: ProductsPageService2
    ) {}

    ngOnInit(): void {
        this.service.fetch();
    }

    onPageChange(page: number) {
        this.service.getPage({ ...this.state().filter, page });
    }
}