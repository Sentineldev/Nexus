import { Component, computed, EventEmitter, Inject, input, OnInit, Output, signal } from "@angular/core";
import Product from "../../../classes/product.class";
import ProductService from "../../../services/product-service";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SuccessAlert } from "../../../../../shared/alerts/success-alert";
import { take } from "rxjs";
import { Loader } from "../../../../../shared/loader/loader";
import ProductRepository from "../../../../../shared/interfaces/product-repository.interface";
import ApiProductRepository from "../../../repositories/product-api.repository";
import { SaveProduct } from "../../../dto/product.dto";

@Component({
    selector: `app-update-product-modal`,
    templateUrl: `./update-product-modal.html`,
    imports: [CustomDialog, DialogToggler, ErrorAlert, ReactiveFormsModule, SuccessAlert, Loader]
})
export default class UpdateProductModal implements OnInit {


    @Output() onUpdate = new EventEmitter();

    public product = input.required<Product>();
    public dialogId = computed(() => `update-product-modal-${this.product().id}`);
    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");


    formGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
    })


    constructor(
        private readonly service: ProductService,
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository
    ) {}
    ngOnInit(): void {
        this.formGroup.controls.name.setValue(this.product().name);
        this.formGroup.controls.description.setValue(this.product().description);
    }
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
            this.repository.update(this.product().id, body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result === "Updated") {
                        this.successMessage.set("Actualizado correctamente");
                        this.service.refreshPage();
                        return;
                    }
                    this.errorMessage.set("No se pudo actualizar");
                }, 1000);
            })
        }
    }

}