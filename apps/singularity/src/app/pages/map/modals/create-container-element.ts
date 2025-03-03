import { Component, computed, input, OnInit } from "@angular/core";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import MapService from "../map.service";
import { ContainerElement, MapContainer } from "../types/map_types";

@Component({
    selector: `app-create-container-element-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm flex flex-col gap-2 p-4 rounded-xl m-auto w-full lg:w-[480px]">
            <div>
                <h1 class="text-center font-bold">Crear Elemento</h1>
            </div>
            <div>
                <form class="flex flex-col gap-6" (ngSubmit)="onSubmitHandler()" [formGroup]="formGroup()">
                    <div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="width" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Width</p>
                                    <input formControlName="width" type="text" name="width" id="width" class="border rounded-sm p-1">
                                </label>
                            </div>
                            <div>
                                <label for="height" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Height</p>
                                    <input formControlName="height" type="text" name="height" id="height" class="border rounded-sm p-1">
                                </label>
                            </div>
                            <div class="col-span-2">
                                <label for="borderRadius" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Border Radius</p>
                                    <input formControlName="borderRadius" type="text" name="borderRadius" id="borderRadius" class="border rounded-sm p-1">
                                </label>
                            </div>
                        </div>
                        <div>
                            <label for="label" class="flex flex-col gap-1">
                                <p class="text-slate-700">Etiqueta</p>
                                <input formControlName="label" type="text" name="label" id="label" class="border rounded-sm p-1 w-full">
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="color" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Color</p>
                                    <input formControlName="color" type="color" name="color" id="color" class="border rounded-sm p-1 w-full">
                                </label>
                            </div>
                            <div>
                                <label for="fontColor" class="flex flex-col gap-1">
                                    <p class="text-slate-700">Color</p>
                                    <input formControlName="fontColor" type="color" name="fontColor" id="fontColor" class="border rounded-sm p-1 w-full">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="p-3 bg-slate-700 text-white rounded-lg w-full">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule]
})
export default class CreateContainerElementModal {


    public container = input.required<MapContainer>();


    public dialogId = computed(() => `unique-modal-to-add-element-${this.container().id}`);

    public formGroup = computed(() => {

        return new FormGroup({
            label: new FormControl("",[Validators.required]),
            width: new FormControl("",[Validators.required]),
            height: new FormControl("",[Validators.required]),
            color: new FormControl(this.container().properties.color,[Validators.required]),
            fontColor: new FormControl(this.container().properties.fontColor,[Validators.required]),
            borderRadius: new FormControl("",[Validators.required]),
        })
    });


    constructor(
        private readonly mapService: MapService
    ) {}

    onSubmitHandler() {

        if (this.formGroup().valid) {


            const value = this.formGroup().value;


            const body =  {
                label: value.label!,
                width: Number(value.width!),
                height: Number(value.height!),
                color: value.color!,
                fontColor: value.fontColor!,
                borderRadius: Number(value.borderRadius!),
            };


            const newElement: ContainerElement = {
                id: new Date().getTime().toString(),
                label: body.label,
                properties: {
                    ...body,
                    posX: 0,
                    posY: 0,
                    type: "ELEMENT",
                },
            };

            this.mapService.addContainerElement(this.container(), newElement);

            this.formGroup().reset({
                height: "",
                label: "",
                width: "",
                color: this.container().properties.color,
                fontColor: this.container().properties.fontColor,
            });
        }
    }

}