import { Component, computed, input } from "@angular/core";
import { ContainerElement, MapContainer } from "../types/map_types";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import MapService from "../map.service";

@Component({
    selector: `app-delete-container-element-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm flex flex-col gap-2 p-4 rounded-xl m-auto w-full lg:w-[480px]">
            <div>
                <h1 class="text-center font-bold">Eliminar Elemento</h1>
            </div>
            <div>
                <p class="font-bold text-wrap ">ESTA SEGURO DE ELIMINAR EL ELEMENTO? TODO LO RELACIONADO CON ESTE SERA ELIMINADO Y NO PODRA RECUPERARSE</p>
            </div>
            <div>
                <button (click)="onSubmitHandler()" type="button" class="w-full p-3 bg-red-600 text-white rounded-lg">Eliminar</button>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog]
})
export default class DeleteContainerElementModal {


    public container = input.required<MapContainer>();
    public element = input.required<ContainerElement>();

    public dialogId = computed(() => `delete---container-element-modal-unique-${this.container().id}-${this.element().id}`);

    constructor(
        private readonly mapService: MapService
    ) {}

    onSubmitHandler() {

        this.mapService.deleteContainerElement(this.container(),this.element());
    }
}