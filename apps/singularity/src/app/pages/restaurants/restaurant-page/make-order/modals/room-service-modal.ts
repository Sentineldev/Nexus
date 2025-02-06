import { Component, computed, effect, input, signal, Signal } from "@angular/core";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import OrderService from "../order-service";
import DialogUtils from "../../../../../utils/dialog";

@Component({
    selector: `app-room-service-modal`,
    imports: [ReactiveFormsModule, CustomDialog],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-slate-600">Room Service</h1>
            <form [formGroup]="formGroup()" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <label for="room">
                        <p class="font-sans text-slate-700">Habitacion</p>
                        <input step="0" formControlName="room" class="border border-slate-300 rounded w-full outline-none p-1" type="number" name="room" id="room"/>
                    </label>
                </div>
                <div>
                    <button class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">Actualizar Orden</button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
})
export default class RoomServiceModal {
    
    
    public dialogId  = signal<string>("room-service-modal");

    public formGroup = computed(() => new FormGroup({
        room: new FormControl<string>("",[Validators.required]),
    }));
    
    constructor(
        private readonly service: OrderService
    ) {}
 
    onSubmitHandler() {

        if (this.formGroup().valid) {

            const value = this.formGroup().value;

            const body = value.room!;

            this.service.setRoom(body.toString());

            DialogUtils.CloseModal(this.dialogId());
        }
    }
}