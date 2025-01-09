import { Component, computed, EventEmitter, input, Output, signal } from "@angular/core";
import CategoryProduct from "../../../../../classes/category-product.class";
import UpdateCategoryProductModal from "./modals/update-modal/update-category-product-modal";
import DialogUtils from "../../../../../../../utils/dialog";
import DeleteCategoryProductModal from "./modals/delete-category-product-modal";

@Component({
    selector: `app-display-category-product`,
    template: `
    <app-update-category-product-modal  [product]="product()" [dialogId]="updateDialogId()"/>
    <app-delete-category-product-modal  [product]="product()" [dialogId]="deleteDialogId()"/>
    <div class="relative">
        <div (click)="showMenuHandler()" 
        class="p-4 flex items-center hover:bg-slate-200 transition-all hover:cursor-pointer {{showMenu() && 'bg-slate-200'}}">
            <div class="flex-1 flex flex-col">
                <p class="font-sans text-slate-700 text-[1.3rem]">{{product().product.name}}</p>
                <p class="text-slate-500 text-sm">{{product().isActive ? "Activo" : "Inactivo"}}</p>
            </div>
            <p class="font-nsas text-slate-700 text-[1.3rem] font-bold">{{product().price}} $</p>
        </div>
        @if (showMenu()) {
            <div class="absolute  bg-white shadow-lg border w-44 z-50">
                <ul class="w-full">
                    <li>
                        <button (click)="openModal('update')" class="hover:bg-slate-200 p-3 w-full text-start font-sans text-sm">Actualizar</button>
                    </li>
                    <li>
                        <button (click)="openModal('delete')" class="hover:bg-slate-200 p-3 text-start w-full font-sans text-sm">Remover</button>
                    </li>
                </ul>
            </div>
        }
    </div>
    
    `,
    imports: [UpdateCategoryProductModal, DeleteCategoryProductModal]
})
export default class DisplayCategoryProduct {


    public showMenu = signal(false);

    public product = input.required<CategoryProduct>()

    public updateDialogId = computed(() => `update-category-product-modal-${this.product().id}`)
    public deleteDialogId = computed(() => `delete-category-product-modal-${this.product().id}`)


    showMenuHandler() {

        this.showMenu.update((current) => !current);
    }

    openModal(type: "update" | "delete") {
        switch (type) {
            case "update":
                DialogUtils.OpenModal(this.updateDialogId())    
            break;
            case "delete":
                DialogUtils.OpenModal(this.deleteDialogId())    
            break;
        }
    }
}