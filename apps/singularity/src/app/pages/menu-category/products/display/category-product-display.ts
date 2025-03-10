import { Component, computed, input } from "@angular/core";
import CategoryProduct from "../../../../core/classes/category-product.class";
import DialogToggler from "../../../../components/dialog/dialog-toggler";
import UpdateMenuProductModal from "../modals/update-menu-product-modal";
import DeleteCategoryProductModal2 from "../modals/delete-menu-product-modal";

@Component({
    selector: `app-category-product-display2`,
    styles: `

        .dropdown {
            display: none;
        }
        .dropdown-toggler:hover + .dropdown {
            display: inherit;

        }
        .dropdown:hover ~ .dropdown-toggler {
            background-color: red;
        }
        .dropdown:hover {
            display: inherit;
        }
    `,
    template: `
    <app-update-menu-product-modal [product]="product()" [dialogId]="updateDialogId()"/>
    <app-delete-category-product-modal2 [product]="product()" [dialogId]="deleteDialogId()"/>
    <div class="relative">
        <div class="dropdown-toggler p-2 flex items-center transition-all hover:cursor-pointer">
            <div class="flex-1">
                <h1 class="font-medium text-lg text-wrap text-start text-black">{{product().product.name}}</h1>
                <p class="text-neutral text-lg">
                    @if (product().isActive) {
                        Activo
                    } @else {
                        Inactivo
                    }
                </p>
            </div>
            <div>
                <p class="font-medium text-primary text-2xl text-end">{{product().price}} $</p>
                <p class="text-black font-medium">Existencia: {{product().count}}</p>
            </div>
        </div>
        <div class="dropdown absolute  bg-white shadow-lg border w-44 z-50">
            <ul class="w-full">
                <li>
                    <app-dialog-toggler [dialogId]="updateDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44 text-start font-sans text-sm cursor-pointer">Actualizar</div>
                    </app-dialog-toggler>
                </li>
                <li>
                    <app-dialog-toggler [dialogId]="deleteDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44 text-start font-sans text-sm">Remover</div>
                    </app-dialog-toggler>
                </li>
            </ul>
        </div>
    </div>
    `,
    imports: [DialogToggler, UpdateMenuProductModal, DeleteCategoryProductModal2]
})
export default class CategoryProductDisplay2 {

    public product = input.required<CategoryProduct>();

    public updateDialogId = computed(() => `update-menu-product-unique-${this.product().id}`);
    public deleteDialogId = computed(() => `delete-menu-product-unique-${this.product().id}`);
}