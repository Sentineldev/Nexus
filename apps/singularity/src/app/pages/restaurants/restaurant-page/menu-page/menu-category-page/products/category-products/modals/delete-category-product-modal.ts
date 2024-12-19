import { Component, input } from "@angular/core";
import CustomDialog from "../../../../../../../../shared/dialog/custom-dialog";
import CategoryProduct from "../../../../../../classes/category-product.class";

@Component({
    selector: `app-delete-category-product-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-4">
            <h1>hola mundo</h1>
        </div>
    </app-custom-dialog>

    `,
    imports: [CustomDialog]
})
export default class DeleteCategoryProductModal {

    public dialogId = input.required<string>();
    public product = input.required<CategoryProduct>();
}