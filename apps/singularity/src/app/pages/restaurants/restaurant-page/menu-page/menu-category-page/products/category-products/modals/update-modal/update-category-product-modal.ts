import { Component, EventEmitter, input, Output, output } from "@angular/core";
import CustomDialog from "../../../../../../../../../shared/dialog/custom-dialog";
import CategoryProduct from "../../../../../../../classes/category-product.class";
import UpdateMenuCategoryForm from "../../../../config-page/update-form";
import UpdateCategoryProductForm from "./update-form";

@Component({
    selector: `app-update-category-product-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Actualizar producto</h1>
            </div>
            <app-update-category-product-form (onUpdate)="onUpdateHandler()" [product]="product()"/>
        </div>
    </app-custom-dialog>

    `,
    imports: [CustomDialog, UpdateCategoryProductForm]
})
export default class UpdateCategoryProductModal {   


    @Output() onUpdate = new EventEmitter();
    public dialogId = input.required<string>();
    public product = input.required<CategoryProduct>();


    onUpdateHandler() {
        this.onUpdate.emit();
    }
}