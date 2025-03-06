import { Component, computed, OnInit, signal } from "@angular/core";
import ProductsPageService2 from "./products-page2.service";
import { Loader } from "../../shared/loader/loader";
import ProductsDisplay2 from "./display/products-display";
import DialogToggler from "../../shared/dialog/dialog-toggler";
import CreateProductModal2 from "./modals/create-product-modal";
import Paginator from "../../shared/paginator/paginator";

@Component({
    selector: `app-products-page2`,
    template: `

    <app-create-product-modal2 [dialogId]="dialogId()"/>
    <div class="p-12">
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        @if(!state().loading && state().products) {
            <div class="flex flex-col gap-4">
                <div class="flex">
                    <div class="flex-1">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-[300px]">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input  type="text" name="search" id="search" class="outline-none" placeholder="Buscar producto...">
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
    imports: [Loader, ProductsDisplay2, DialogToggler, CreateProductModal2, Paginator]
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