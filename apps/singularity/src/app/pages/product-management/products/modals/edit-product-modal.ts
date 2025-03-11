import { Component, Inject, input, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import ProductsPageService2 from "../products-page2.service";
import ProductRepository, { SaveProduct } from "../../../../core/interfaces/product-repository.interface";
import ApiProductRepository from "../../../../core/api/product-api.repository";
import Product from "../../../../core/classes/product.class";
import { Loader } from "../../../../components/loader/loader";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import ReactiveFormTextArea from "../../../../components/forms/reactive-textarea";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";

@Component({
    selector: `app-edit-product-modal2`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-primary font-bold text-center text-xl">Actualizar producto</h1>
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
                    [id]="'name-'+product().id"
                    [control]="formGroup.controls.name"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                    <app-reactive-form-textarea
                    label="Descripcion"
                    [id]="'description'+product().id"
                    [control]="formGroup.controls.description"
                    [rows]="4"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button [disabled]="loading()" type="submit" class="btn w-full">
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
    imports: [ReactiveFormsModule, Loader, ReactiveFormInput, ReactiveFormTextArea, SuccessAlert, ErrorAlert, CustomDialog]
})
export default class EditProductModal2 implements OnInit {

    public dialogId = input.required<string>();

    public product = input.required<Product>();

    public loading = signal<boolean>(false);
    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");

    public formGroup = new FormGroup({
        name: new FormControl<string>("",[Validators.required]),
        description: new FormControl<string>("",[Validators.required]),
        group: new FormControl<string>("",[Validators.required]),
    });

    constructor(
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository,
        private readonly service: ProductsPageService2,
    ) {}
    ngOnInit(): void {
        this.formGroup.setValue({
            description: this.product().description,
            name: this.product().name,
            group: this.product().group,
        });
    }


    onSubmitHandler() {

        if (this.formGroup.valid) {
            const value = this.formGroup.value;

            const body: SaveProduct = {
                description: value.description!,
                name: value.name!,
                group: value.group!,
            };  

            this.errorMessage.set("");
            this.successMessage.set("");
            this.loading.set(true);
            this.repository.update(this.product().id, body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.formGroup.reset();
                        this.successMessage.set("Actualizado exitosamente");
                        this.service.fetch();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })

        }
    }
}