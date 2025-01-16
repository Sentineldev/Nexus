import { Component, computed, input  } from "@angular/core";
import CustomDialog from "../../../../../shared/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import OrderService, { OrderProductState } from "../order-service";

@Component({
    selector: `app-modify-quantity-modal`,
    imports: [ReactiveFormsModule, CustomDialog],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-slate-600">Modificar cantidad</h1>
            <form [formGroup]="formGroup()" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <label for="quantity">
                        <p class="font-sans text-slate-700">Ingresar cantidad</p>
                        <input step="0" formControlName="quantity" class="border border-slate-300 rounded w-full outline-none p-1" type="number" name="quantity" id="quantity"/>
                    </label>
                </div>
                <div>
                    <button class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
})
export default class ModifyQuantityModal {
    
    
    public dialogId  = input.required<string>();
    public product = input.required<OrderProductState>();

    public quantity = input.required<number>();

    public formGroup = computed(() => new FormGroup({
        quantity: new FormControl<number>(this.quantity(),[Validators.required]),
    }));
    
    constructor(
        private readonly service: OrderService
    ) {}
 
    onSubmitHandler() {

        if (this.formGroup().valid) {

            const value = this.formGroup().value;

            const body = value.quantity!;

            this.service.modifyProduct({...this.product(), quantity: Number(body)});
        }
    }
}