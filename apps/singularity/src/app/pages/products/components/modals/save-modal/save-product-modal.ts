import { Component, EventEmitter, Inject, Output, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { take } from "rxjs";
import { SaveProduct } from "../../../dto/product.dto";
import ProductService from "../../../services/product-service";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../../../shared/dialog/dialog-toggler";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../../../shared/alerts/success-alert";
import ProductRepository from "../../../../../shared/interfaces/product-repository.interface";
import ApiProductRepository from "../../../../../shared/repositories/api/product-api.repository";
import { Loader } from "../../../../../shared/loader/loader";

@Component({
    selector: "app-save-product-modal",
    templateUrl: "./save-product-modal.html",
    styles: `
        .grow-wrap {
        /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
        display: grid;
        }
        .grow-wrap::after {
        /* Note the weird space! Needed to preventy jumpy behavior */
        content: attr(data-replicated-value) " ";

        /* This is how textarea text behaves */
        white-space: pre-wrap;

        /* Hidden from view, clicks, and screen readers */
        visibility: hidden;
        }
        .grow-wrap > textarea {
        /* You could leave this, but after a user resizes, then it ruins the auto sizing */
        resize: none;

        /* Firefox shows scrollbar on growth, you can hide like this. */
        overflow: hidden;
        }
        .grow-wrap > textarea,
        .grow-wrap::after {
        /* Identical styling required!! */
        border: 1px solid black;
        padding: 0.5rem;
        font: inherit;

        /* Place on top of each other */
        grid-area: 1 / 1 / 2 / 2;
        }
    `,
    imports: [CustomDialog, DialogToggler, ErrorAlert, SuccessAlert, ReactiveFormsModule, Loader]
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
        @Inject(ApiProductRepository)
        private readonly repository: ProductRepository,
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

            this.repository.save(data).pipe(take(1)).subscribe((result) => {

                this.loading.set(false);
                if (result === "Created") {
                    this.successMessage.set(`Creado correctamente`);
                    this.formGroup.reset();
                    this.service.refreshPage();
                    return;
                }
                this.errorMessage.set("No se pudo crear")
            })
        }
    }



}