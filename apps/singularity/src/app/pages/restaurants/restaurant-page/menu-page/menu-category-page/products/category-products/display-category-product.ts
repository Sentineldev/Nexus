import { Component, computed, EventEmitter, input, Output, signal } from "@angular/core";
import CategoryProduct from "../../../../../classes/category-product.class";
import UpdateCategoryProductModal from "./modals/update-modal/update-category-product-modal";
import DeleteCategoryProductModal from "./modals/delete-category-product-modal";
import DialogToggler from "../../../../../../../shared/dialog/dialog-toggler";

@Component({
    selector: `app-display-category-product`,
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
    <app-update-category-product-modal  [product]="product()" [dialogId]="updateDialogId()"/>
    <app-delete-category-product-modal  [product]="product()" [dialogId]="deleteDialogId()"/>
    <app-dialog-toggler></app-dialog-toggler>
    <div class="relative">
        <div 
        class="dropdown-toggler p-4 flex items-center transition-all hover:cursor-pointer }}">
            <div class="flex-1 flex flex-col">
                <p class="font-sans text-slate-700 text-[1.3rem]">{{product().product.name}}</p>
                <p class="text-slate-500 text-sm">{{product().isActive ? "Activo" : "Inactivo"}}</p>
            </div>
            <p class="font-nsas text-slate-700 text-[1.3rem] font-bold">{{product().price}} $</p>
        </div>
        <div class="dropdown absolute  bg-white shadow-lg border w-44 z-50">
            <ul class="w-full">
                <li>
                    <app-dialog-toggler [dialogId]="updateDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-full text-start font-sans text-sm">Actualizar</div>
                    </app-dialog-toggler>
                    <!-- <button (click)="openModal('update')" class="hover:bg-slate-200 p-3 w-full text-start font-sans text-sm">Actualizar</button> -->
                </li>
                <li>
                    <app-dialog-toggler [dialogId]="deleteDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-full text-start font-sans text-sm">Remover</div>
                    </app-dialog-toggler>
                    <!-- <button (click)="openModal('delete')" class="hover:bg-slate-200 p-3 text-start w-full font-sans text-sm">Remover</button> -->
                </li>
            </ul>
        </div>
    </div>
    
    `,
    imports: [UpdateCategoryProductModal, DeleteCategoryProductModal, DialogToggler]
})
export default class DisplayCategoryProduct {


    public product = input.required<CategoryProduct>()

    public updateDialogId = computed(() => `update-category-product-modal-${this.product().id}`)
    public deleteDialogId = computed(() => `delete-category-product-modal-${this.product().id}`)

    // openModal(type: "update" | "delete") {
    //     switch (type) {
    //         case "update":
    //             DialogUtils.OpenModal(this.updateDialogId())    
    //         break;
    //         case "delete":
    //             DialogUtils.OpenModal(this.deleteDialogId())    
    //         break;
    //     }
    // }
}