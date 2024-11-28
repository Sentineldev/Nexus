import { Component, EventEmitter, Output, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs";
import { SaveProduct } from "../../../dto/product.dto";
import ProductService from "../../../services/product-service";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../../../shared/alerts/success-alert";

@Component({
    selector: "app-save-product-modal",
    templateUrl: "./save-product-modal.html",
    imports: [CustomDialog, DialogToggler, ErrorAlert, SuccessAlert, ReactiveFormsModule]
})
export default class SaveProductModal {


    
    public dialogId = `save-product-modal`;
    @Output() onUpdate = new EventEmitter();


    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
    });


    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");


    constructor(
        private readonly service: ProductService
    ) {}

    async onSubmitHandler() {
        const formFields = this.formGroup.value;

        if (this.formGroup.valid) {
            const data: SaveProduct = {
                name: formFields.name!, 
                description: formFields.description!, 
            }
            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");

            this.service.save(data).pipe(take(1)).subscribe((result) => {
                this.loading.set(false);
                if (result === "Created") {
                    this.successMessage.set(`Creado correctamente`);
                    this.formGroup.reset();
                    this.onUpdate.emit();
                    return;
                }
                this.errorMessage.set("No se pudo crear")
            })
        }
    }



}