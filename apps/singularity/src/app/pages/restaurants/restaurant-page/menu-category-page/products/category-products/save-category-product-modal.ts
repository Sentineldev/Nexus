import { AfterViewInit, Component, computed, EventEmitter, input, OnInit, Output } from "@angular/core";
import CustomDialog from "../../../../../../shared/dialog/custom-dialog";
import Product from "../../../../../products/classes/product.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveCategoryProduct } from "../../../../dto/category-product.dto";
import MenuCategoryPageService from "../../menu-category-page.service";
import CategoryProductsService from "./category-products.service";
import { take } from "rxjs";

@Component({
    selector: `app-save-category-product-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[400px]">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Agregar al menu</h1>
            </div>
            <div>
                <form class="flex flex-col gap-4" [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()">
                    <div>
                        <label class="flex flex-col gap-1" for="name">
                            <p class="text-slate-700">Precio</p>
                            <input class="border rounded border-slate-300 outline-none p-1" type="text"  formControlName="price">
                        </label>
                    </div>
                    <div>
                        <button class="w-full bg-cyan-500 p-2 rounded-lg text-white  transition-all ">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule]
})
export default class SaveCategoryProductModal implements AfterViewInit {


    @Output() onAddedProduct = new EventEmitter<SaveCategoryProduct>();

    public dialogId = input.required<string>()
    public product = input.required<Product>();


    public formGroup = new FormGroup({
        price: new FormControl('', [Validators.required])
    }); 


    public state = computed(() => this.service.getState());

    public productsState = computed(() => this.categoryProductService.getState());

    constructor(
        private readonly service: MenuCategoryPageService,
        private readonly categoryProductService: CategoryProductsService
    ) {}
    ngAfterViewInit(): void {
        const dialog = document.getElementById(this.dialogId()) as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }
    onSubmitHandler() {

        if (this.formGroup.valid) {
            const data = this.formGroup.value;

            const newData: SaveCategoryProduct = {
                price: Number(data.price),
                categoryId: this.state().category.id,
                productId: this.product().id,
                isEnabled: true,
            };
            this.categoryProductService.save(newData).pipe(take(1)).subscribe((result) => {

                if (result === "Created") {
                    this.formGroup.reset();
                    this.categoryProductService.getPage(this.productsState().filter);
                    return;
                }
                alert(result);
            })
        }
    }


}