import { Component, Inject, input, OnInit, signal } from "@angular/core";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import ReactiveFormInput from "../../../shared/forms/reactive-input";
import ReactiveFormTextArea from "../../../shared/forms/reactive-textarea";
import ProductRepository from "../../../shared/interfaces/product-repository.interface";
import ApiProductRepository from "../../../shared/repositories/api/product-api.repository";
import { SaveProduct } from "../../products/dto/product.dto";
import ProductsPageService2 from "../products-page2.service";
import { Loader } from "../../../shared/loader/loader";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import Product from "../../products/classes/product.class";

@Component({
    selector: `app-delete-product-modal2`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-primary font-bold text-center text-xl">Eliminar producto</h1>
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
                <fieldset class="rounded border-neutral border p-2">
                    <legend>Producto</legend>
                    <p>Nombre: {{product().name}}</p>
                    <p>Descripcion: {{product().description}}</p>
                </fieldset>
            </div>
            <div>
                <button [disabled]="loading()" (click)="onSubmitHandler()" type="button" class="btn w-full">
                    @if (!loading()) {
                        Eliminar
                    } @else {
                        <app-loader color="secondary"/>
                    }
                </button>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule, Loader, ErrorAlert, SuccessAlert]
})
export default class DeleteProductModal2 {

    public dialogId = input.required<string>();

    public product = input.required<Product>();

    public loading = signal<boolean>(false);
    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");

    constructor(
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository,
        private readonly service: ProductsPageService2,
    ) {}


    onSubmitHandler() {
    
        this.errorMessage.set("");
        this.successMessage.set("");
        this.loading.set(true);
        this.repository.delete(this.product().id).subscribe((result) => {

            setTimeout(() => {
                if (result.length === 0) {
                    this.service.fetch();
                    this.successMessage.set("Eliminado correctamente")
                    return;
                }
                this.loading.set(false);
                this.errorMessage.set(result);
            }, 1000);
        })
    }
}