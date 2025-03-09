import { Component, signal, input, Inject } from "@angular/core";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import { Loader } from "../../../../components/loader/loader";
import ApiCategoryProductRepository from "../../../../core/api/category-product-api.repository";
import CategoryProduct from "../../../../core/classes/category-product.class";
import CategoryProductRepository from "../../../../core/interfaces/category-product.repository";
import CategoryProductPageService2 from "../category-product-page.service";

@Component({
    selector: `app-delete-category-product-modal2`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-primary text-[1.1rem] text-center font-sans">Remover producto</h1>
            </div>
            @if (errorMessage().length > 0 || successMessage().length > 0) {
                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <div>
                <button (click)="onClickHandler()" type="button" [disabled]="loading()" class="btn w-full">
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
    imports: [CustomDialog, Loader, ErrorAlert, SuccessAlert]
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