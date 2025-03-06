import { Component, Inject, input, signal } from "@angular/core";
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

@Component({
    selector: `app-create-product-modal2`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-primary font-bold text-center text-xl">Crear producto</h1>
            </div>
            @if (errorMessage().length > 0 || successMessage().length > 0) {
                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <form (ngSubmit)="onSubmitHandler()" class="flex flex-col gap-4" [formGroup]="formGroup">
                <div class="flex flex-col gap-2">
                    <app-reactive-form-input
                    label="Nombre"
                    [id]="'name'"
                    [control]="formGroup.controls.name"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                    <app-reactive-form-textarea
                    label="Descripcion"
                    [id]="'description'"
                    [control]="formGroup.controls.description"
                    [rows]="4"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button [disabled]="loading()" type="submit" class="btn w-full">
                        @if (!loading()) {
                            Crear
                        } @else {
                            <app-loader color="secondary"/>
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule, ReactiveFormInput, ReactiveFormTextArea, Loader, ErrorAlert, SuccessAlert]
})
export default class CreateProductModal2 {

    public dialogId = input.required<string>();

    public loading = signal<boolean>(false);
    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");

    public formGroup = new FormGroup({
        name: new FormControl<string>("",[Validators.required]),
        description: new FormControl<string>("",[Validators.required]),
    });

    constructor(
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository,
        private readonly service: ProductsPageService2,
    ) {}


    onSubmitHandler() {

        if (this.formGroup.valid) {
            const value = this.formGroup.value;

            const body: SaveProduct = {
                description: value.description!,
                name: value.name!,
            };  

            this.errorMessage.set("");
            this.successMessage.set("");
            this.loading.set(true);
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.formGroup.reset();
                        this.successMessage.set("Creado exitosamente");
                        this.service.fetch();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })

        }
    }
}