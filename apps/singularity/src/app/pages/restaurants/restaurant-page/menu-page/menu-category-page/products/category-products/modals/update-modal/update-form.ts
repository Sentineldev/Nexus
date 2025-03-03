import { Component, EventEmitter, Inject, input, OnInit, Output, signal } from "@angular/core";
import CategoryProduct from "../../../../../../../classes/category-product.class";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import CategoryProductRepository from "../../../../../../../interfaces/category-product.repository";
import { UpdateCategoryProduct } from "../../../../../../../dto/category-product.dto";
import { ErrorAlert } from "../../../../../../../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../../../../../../../shared/alerts/success-alert";
import { Loader } from "../../../../../../../../../shared/loader/loader";
import CategoryProductsService from "../../category-products.service";
import ApiCategoryProductRepository from "../../../../../../../../../shared/repositories/api/category-product-api.repository";

@Component({
    selector: `app-update-category-product-form`,
    imports: [ReactiveFormsModule, ErrorAlert, SuccessAlert, Loader],
    template: `
    
    <form class="flex flex-col gap-4" [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()">
        @if (errorMessage().length > 0 || successMessage().length > 0) {
            @if (errorMessage().length > 0) {
                <app-error-alert [message]="errorMessage()"/>
            }
            @if (successMessage().length > 0) {
                <app-success-alert [message]="successMessage()"/>
            }
        }

        <div class="flex flex-col gap-2">
            <label for="is_active" class="flex items-center gap-2  text-wrap ">
                <input formControlName="isActive" class="h-6 w-6" type="checkbox" name="is_active" id="is_active"/>
                <p class="font-sans text-lg text-slate-700">Habilitar / Deshabilitar</p>
            </label> 
            <label for="price">
                <p>Precio</p>
                <input type="text" name="price" id="price" formControlName="price" class="border p-1 outline-hidden font-sans text-lg w-full rounded-sm border-slate-400"/>
            </label>
        </div>
        <div>
            <button [disabled]="loading()" type="submit" class="bg-slate-700 text-white font-sans p-3 w-full rounded-sm">
                @if (loading()) {
                    <app-loader/>
                } @else {
                    Actualizar
                }
            </button>
        </div>
    </form>
    `
})
export default class UpdateCategoryProductForm implements OnInit {
    

    @Output() onUpdate = new EventEmitter();
    public product = input.required<CategoryProduct>()


    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public formGroup = new FormGroup({
        price: new FormControl<string>(""),
        isActive: new FormControl<boolean>(false),
    });

    constructor(
        @Inject(ApiCategoryProductRepository)
        private readonly repository: CategoryProductRepository,
        private readonly categoryProductService: CategoryProductsService,
    ) {}

    ngOnInit(): void {
    
        this.formGroup.setValue({
            isActive: this.product().isActive,
            price: this.product().price.toString()
        })
    }


    onSubmitHandler() {


        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: UpdateCategoryProduct = {
                isActive: data.isActive!,
                price: Number(data.price!)
            };

            this.successMessage.set("");
            this.errorMessage.set("");
            this.loading.set(true);
            this.repository.update(this.product().id, body).subscribe((result) => {
                this.loading.set(false);
                if (result.length === 0) {
                    this.successMessage.set("Actualizacion correcta");
                    this.categoryProductService.refreshPage();
                    return;
                }
                this.errorMessage.set(result);
            })
        } 
    }

}