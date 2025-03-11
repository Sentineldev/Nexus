import { Component, Inject, input, OnInit, signal } from "@angular/core";
import CategoryProduct from "../../../../core/classes/category-product.class";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import ValidatorsUtils from "../../../../utils/validators";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import CategoryProductRepository, { UpdateCategoryProduct } from "../../../../core/interfaces/category-product.repository";
import ApiCategoryProductRepository from "../../../../core/api/category-product-api.repository";
import CategoryProductPageService2 from "../category-product-page.service";
import { Loader } from "../../../../components/loader/loader";
import { IsActiveValues } from "../../../../core/types/globa";

@Component({
    selector: `app-update-menu-product-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-primary font-medium text-center text-xl">Actualizar Producto</h1>
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
                <div class="flex flex-col gap-4">
                    <label for="is_active" class="flex items-center gap-2  text-wrap ">
                        <input formControlName="isActive" class="h-6 w-6 accent-primary" type="checkbox" name="is_active" id="is_active"/>
                        <p class="font-sans text-lg text-slate-700">Habilitar / Deshabilitar</p>
                    </label> 
                    <app-reactive-form-input
                    label="Precio"
                    [id]="'price-'+product().id"
                    [control]="form.controls.price"
                    [errors]="
                    { required: 'No puedes dejar este campo vacio', 
                      isNumberAndTwoDecimals: 'Debe ser un numero con maximo 2 decimales'
                    }"
                    />
                    <app-reactive-form-input
                    label="Cantidad"
                    [id]="'count-'+product().id"
                    [control]="form.controls.count"
                    [errors]="
                    { required: 'No puedes dejar este campo vacio', 
                      isNumberInteger: 'Debe ser un numero entero'
                    }"
                    />
                </div>
                <div>
                    <button type="submit" [disabled]="loading()" class="btn w-full">
                        @if (!loading()) {
                            Actualizar
                        } @else {
                            <app-loader color="secondary"/>
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ErrorAlert, SuccessAlert, ReactiveFormInput, Loader, ReactiveFormsModule]
})
export default class UpdateMenuProductModal implements OnInit {
    
    public dialogId = input.required<string>();
    
    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");
    public loading = signal<boolean>(false);

    public product = input.required<CategoryProduct>();
    public form = new FormGroup({
        price: new FormControl<string>("",[Validators.required, ValidatorsUtils.IsNumberAndTwoDecimals]),
        count: new FormControl<string>("",[Validators.required, ValidatorsUtils.IsNumberInteger]),
        isActive: new FormControl<boolean>(false),
    });
    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository,
        private pageService: CategoryProductPageService2,
    ) {}

    ngOnInit(): void {
    
        this.form.setValue({
            isActive: this.product().isActive,
            price: this.product().price.toString(),
            count: this.product().count.toString(),
        })
    }

     onSubmitHandler() {
        
            if (this.form.valid) {
                this.errorMessage.set("");
                this.successMessage.set("");
                const value = this.form.value;
                
                const body: UpdateCategoryProduct = {
                    isActive: JSON.stringify(value.isActive!) as IsActiveValues,
                    price: Number(value.price!),
                    count: Number(value.count!),
                };
    
                this.loading.set(true);
                this.repository.update(this.product().id, body).subscribe((result) => {
                    setTimeout(() => {
                        this.loading.set(false);
    
                        if (result.length === 0) {
                            this.successMessage.set("Actualizado correctamente");
                            this.pageService.fetch();
                            return
                        }
                        this.errorMessage.set(result);
                        
                    }, 1000);
                });
            }
        }
}