import { Component, EventEmitter, input, Output, output } from "@angular/core";
import CustomDialog from "../../../../../../../../../shared/dialog/custom-dialog";
import CategoryProduct from "../../../../../../../classes/category-product.class";
import UpdateMenuCategoryForm from "../../../../../../../../menu-category/config/update-form";
import UpdateCategoryProductForm from "./update-form";
import ProductFieldsetContainer from "../product-fieldset-container";

@Component({
    selector: `app-update-category-product-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[400px] flex flex-col gap-4">
            <div>
                <h1 class="text-slate-700 text-[1.1rem] text-center font-sans">Actualizar producto</h1>
            </div>
            <app-product-fieldset-container [product]="product()"/>
            <app-update-category-product-form [product]="product()"/>
        </div>
    </app-custom-dialog>

    `,
    imports: [CustomDialog, UpdateCategoryProductForm, ProductFieldsetContainer]
})
export default class UpdateCategoryProductModal {   


    public dialogId = input.required<string>();
    public product = input.required<CategoryProduct>();
}