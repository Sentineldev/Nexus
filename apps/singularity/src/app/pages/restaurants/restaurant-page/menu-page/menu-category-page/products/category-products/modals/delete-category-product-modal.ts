import { Component, EventEmitter, Inject, input, Output, signal } from "@angular/core";
import CustomDialog from "../../../../../../../../shared/dialog/custom-dialog";
import CategoryProduct from "../../../../../../classes/category-product.class";
import ProductFieldsetContainer from "./product-fieldset-container";
import { Loader } from "../../../../../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../../../../../shared/alerts/error-alert";
import CategoryProductRepository from "../../../../../../interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../../../../repositories/category-product-api.repository";

@Component({
    selector: `app-delete-category-product-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Remover producto</h1>
            </div>
            <app-product-fieldset-container [product]="product()"/>
            @if (errorMessage().length > 0) {
                <app-error-alert [message]="errorMessage()"/>
            }
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
    imports: [CustomDialog, ProductFieldsetContainer, Loader, ErrorAlert]
})
export default class DeleteCategoryProductModal {


    @Output() onDelete = new EventEmitter();

    public loading = signal(false);
    public errorMessage = signal("");

    public dialogId = input.required<string>();
    public product = input.required<CategoryProduct>();

    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository
    ) {}

    onClickHandler() {

        this.errorMessage.set("");
        this.loading.set(true);
        this.repository.delete(this.product().id).subscribe((result) => {

            if (result.length === 0) {
                this.onDelete.emit();
                return;
            }
            this.loading.set(false);
            this.errorMessage.set(result);
        })
    }
}