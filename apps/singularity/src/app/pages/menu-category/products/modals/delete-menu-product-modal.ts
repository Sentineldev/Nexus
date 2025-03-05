import { Component, signal, input, Inject } from "@angular/core";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../../shared/alerts/success-alert";
import CustomDialog from "../../../../shared/dialog/custom-dialog";
import { Loader } from "../../../../shared/loader/loader";
import ApiCategoryProductRepository from "../../../../shared/repositories/api/category-product-api.repository";
import CategoryProduct from "../../../restaurants/classes/category-product.class";
import CategoryProductRepository from "../../../restaurants/interfaces/category-product.repository";
import ProductFieldsetContainer from "../../../restaurants/restaurant-page/menu-page/menu-category-page/products/category-products/modals/product-fieldset-container";
import CategoryProductPageService2 from "../category-product-page.service";

@Component({
    selector: `app-delete-category-product-modal2`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Remover producto</h1>
            </div>
            @if (errorMessage().length > 0 || successMessage().length > 0) {
                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <app-product-fieldset-container [product]="product()"/>
            <div>
                <button (click)="onClickHandler()" type="button" [disabled]="loading()" class="bg-red-500 p-3 w-full rounded-lg text-white font-sans">
                    @if (loading()) {
                        <app-loader/>
                    } @else {
                        Remover
                    }
                </button>
            </div>
        </div>
    </app-custom-dialog>

    `,
    imports: [CustomDialog, ProductFieldsetContainer, Loader, ErrorAlert, SuccessAlert]
})
export default class DeleteCategoryProductModal2 {


    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public dialogId = input.required<string>();
    public product = input.required<CategoryProduct>();

    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository,
        private pageService: CategoryProductPageService2,
    ) {}

    onClickHandler() {

        this.errorMessage.set("");
        this.loading.set(true);
        this.repository.delete(this.product().id).subscribe((result) => {
            setTimeout(() => {
                if (result.length === 0) {
                    this.successMessage.set("Eliminado correctamente");
                    this.pageService.fetch();
                    return;
                }
                this.loading.set(false);
                this.errorMessage.set(result);
            }, 1000);
        })
    }
}