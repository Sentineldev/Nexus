import { Component, computed, signal} from "@angular/core";
import CustomDialog from "../../../components/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import OrderService from "../order-service";
import DialogUtils from "../../../utils/dialog";
import ReactiveFormInput from "../../../components/forms/reactive-input";

@Component({
    selector: `app-room-service-modal`,
    imports: [ReactiveFormsModule, CustomDialog, ReactiveFormInput],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-medium text-primary">Room Service</h1>
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <app-reactive-form-input
                    label="Habitacion"
                    [id]="'room'"
                    [control]="formGroup.controls.room"
                    [errors]="{ required: 'Debes ingresar la habitacion' }"
                    />
                </div>
                <div>
                    <button class="btn w-full" type="submit">Actualizar Orden</button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
})
export default class RoomServiceModal {
    
    
    public dialogId  = signal<string>("room-service-modal");

    public formGroup = new FormGroup({
        room: new FormControl<string>("",[Validators.required]),
    });

    
    constructor(
        private readonly service: OrderService
    ) {}
 
    onSubmitHandler() {

        if (this.formGroup.valid) {

            const value = this.formGroup.value;

            const body = value.room!;

            this.service.setRoom(body.toString());

            DialogUtils.CloseModal(this.dialogId());
        }
    }
}