import { Component, computed, EventEmitter, input, OnInit, Output, signal } from "@angular/core";
import Product from "../../../classes/product.class";
import ProductService from "../../../services/product-service";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SuccessAlert } from "../../../../../shared/alerts/success-alert";
import { take } from "rxjs";

@Component({
    selector: `app-update-product-modal`,
    templateUrl: `./update-product-modal.html`,
    imports: [CustomDialog, DialogToggler, ErrorAlert, ReactiveFormsModule, SuccessAlert]
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
        private readonly service: ProductService
    ) {}
    ngOnInit(): void {
        this.formGroup.controls.name.setValue(this.product().name);
        this.formGroup.controls.description.setValue(this.product().description);
    }
    onSubmitHandler() {
        if (this.formGroup.valid) {
            this.errorMessage.set("");
            this.successMessage.set("");
            this.loading.set(true);
            this.service.update(this.product().id, {
                name: this.formGroup.controls.name.value!,
                description: this.formGroup.controls.description.value!
            }).pipe(take(1)).subscribe((result) => {
                this.loading.set(false);
                if (result === "Updated") {
                    this.successMessage.set("Actualizado correctamente");
                    this.onUpdate.emit();
                    return;
                }
                this.errorMessage.set("No se pudo actualizar");
            })
        }
    }

}