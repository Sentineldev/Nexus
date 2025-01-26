import { Component, computed, input } from "@angular/core";
import { MapContainer } from "../types/map_types";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import EditContainerElementModal from "./edit-container-element-modal ";
import DeleteContainerElementModal from "./delete-container-element-modal";

@Component({
    selector: `app-container-elements-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow flex flex-col gap-2 p-4 rounded-xl m-auto w-full lg:w-[480px]">
            <div>
                <h1 class="text-center font-bold">Elementos del contenedor</h1>
            </div>
            <div class=" flex flex-col gap-2">
                @if (container().elements.length === 0) {
                    <p>El contenedor no tiene elementos...</p>
                }
                @for (element of container().elements; track element.id) {
                    <app-edit-container-element-modal [container]="container()" [element]="element"/>
                    <app-delete-container-element-modal [container]="container()" [element]="element"/>
                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-2">
                            <div style="background-color: {{element.properties.color}} ;" class="h-8 w-8"></div>
                            <div>
                                <p class="font-bold ">{{element.label}}</p>
                                <p class="text-slate-700 text-sm  ">width: {{element.properties.width}}px height: {{element.properties.height}}px</p>
                            </div>
                        </div>
                        <div class="flex-1 gap-2 flex justify-end">
                            <app-dialog-toggler [dialogId]="'unique-modal-to-edit-container-element-'+container().id+'-'+element.id">
                                <div>
                                    <img src="./svg/edit-svgrepo-com.svg" alt="edit icon" width="32" height="32">
                                </div>
                            </app-dialog-toggler>
                            <app-dialog-toggler [dialogId]="'delete---container-element-modal-unique-'+container().id+'-'+element.id">
                                <div>
                                    <img src="./svg/trash-svgrepo-com.svg" alt="edit icon" width="32" height="32">
                                </div>
                            </app-dialog-toggler>
                        </div>
                    </div>
                }
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, DialogToggler, EditContainerElementModal, DeleteContainerElementModal]
})
export default class ContainerElementsModal {


    public container = input.required<MapContainer>();

    public dialogId = computed(() => `some-unique-display-for-elements-${this.container().id}`);
}