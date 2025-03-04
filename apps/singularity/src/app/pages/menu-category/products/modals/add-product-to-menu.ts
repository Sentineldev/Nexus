import { Component, computed, Inject, input, signal } from "@angular/core";
import Product from "../../../products/classes/product.class";
import CustomDialog from "../../../../shared/dialog/custom-dialog";
import ReactiveFormInput from "../../../../shared/forms/reactive-input";
import { Loader } from "../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../../shared/alerts/success-alert";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import CategoryProductRepository from "../../../restaurants/interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../../shared/repositories/api/category-product-api.repository";
import { SaveCategoryProduct } from "../../../restaurants/dto/category-product.dto";
import MenuCategoryPageService2 from "../../menu-category-page.service";
import CategoryProductPageService2 from "../category-product-page.service";
import ValidatorsUtils from "../../../../utils/validators";

@Component({
    selector: `app-add-product-to-menu-modal`,
    template: `

    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-black font-medium text-center text-xl">Crear Categoria</h1>
            </div>
            @if (errorMessage().length > 0 || successMessage().length > 0) {
                <div>
                    @if (errorMessage().length > 0) {
                        <app-error-alert [message]="errorMessage()"/>
                    }
                    @if (successMessage().length > 0) {
                        <app-success-alert [message]="successMessage()"/>
                    }
                </div>
            }
            <form (ngSubmit)="onSubmitHandler()" [formGroup]="form" class="flex flex-col gap-6">
                <div>
                    <app-reactive-form-input
                    label="Precio"
                    id="price"
                    [control]="form.controls.price"
                    [errors]="
                    { required: 'No puedes dejar este campo vacio', 
                      isNumberAndTwoDecimals: 'Debe ser un numero con maximo 2 decimales'
                    }"
                    />
                </div>
                <div>
                    <button type="submit" [disabled]="loading()" class="btn">
                        @if (!loading()) {
                            Agregar
                        } @else {
                            <app-loader color="secondary"/>
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    
    `,
    imports: [CustomDialog, ReactiveFormInput, Loader, ErrorAlert, SuccessAlert, ReactiveFormsModule]
})
export default class AddProductToMenuModal {
    
    public product = input.required<Product>();

    public dialogId = input.required<string>();
    
    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");
    public loading = signal<boolean>(false);

    public category = computed(() => this.service.getCategory());

    public form = new FormGroup({
        price: new FormControl<string>("",[Validators.required, ValidatorsUtils.IsNumberAndTwoDecimals])
    });

    constructor(

        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository,
        private readonly service: MenuCategoryPageService2,
        private pageService: CategoryProductPageService2,
    ) {}

    onSubmitHandler() {
    
        if (this.form.valid) {
            this.errorMessage.set("");
            this.successMessage.set("");
            const value = this.form.value;
            
            const body: SaveCategoryProduct = {
                categoryId: this.category().id,
                price: Number(value.price!),
                productId: this.product().id,
            };

            this.loading.set(true);
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);

                    if (result.length === 0) {
                        this.successMessage.set("Agregado correctamente");
                        this.pageService.fetch();
                        return
                    }
                    this.errorMessage.set(result);
                    
                }, 1000);
            });
        }
    }
}