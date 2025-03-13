import { Component, computed, input, OnInit  } from "@angular/core";
import CustomDialog from "../../../components/dialog/custom-dialog";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import OrderService, { OrderProductState } from "../order-service";
import DialogUtils from "../../../utils/dialog";
import ReactiveFormInput from "../../../components/forms/reactive-input";
import ValidatorsUtils from "../../../utils/validators";

@Component({
    selector: `app-modify-quantity-modal`,
    imports: [ReactiveFormsModule, CustomDialog, ReactiveFormInput],
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-medium text-primary">Modificar cantidad</h1>
            <div class="flex flex-col gap-1">
                <div>
                    <button (click)="onRemoveHandler()" type="button" class="bg-red-600 p-2 rounded-sm text-white">Remover</button>
                </div>
                <fieldset class="border p-2 rounded-sm">
                    <legend>Producto Seleccionado</legend>
                    <div class="flex items-center justify-center">
                        <p class="flex-1 text-slate-800">{{product().product.product.name}}</p>
                        <p>{{product().quantity}}x</p>
                    </div>
                    <div>
                        <p class="font-bold">{{product().quantity}} $</p>
                    </div>
                </fieldset>
            </div>
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                   
                    <app-reactive-form-input
                    label="Cantidad"
                    [id]="'quantity'"
                    [control]="formGroup.controls.quantity"
                    [errors]="{ required: 'Debes ingresar la cantidad', isNumberInteger: 'Debe ser un numero entero' }"
                    />
                </div>
                <div>
                    <button class="btn w-full" type="submit">Actualizar</button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
})
export default class ModifyQuantityModal implements OnInit {
    
    
    public dialogId  = input.required<string>();
    public product = input.required<OrderProductState>();

    public quantity = input.required<number>();

    public formGroup = new FormGroup({
        quantity: new FormControl<string>("",[Validators.required, ValidatorsUtils.IsNumberInteger]),
    })
    
    constructor(
        private readonly service: OrderService
    ) {}
    ngOnInit(): void {
        this.formGroup.setValue({
            quantity: this.quantity().toString(),
        })
    }
 

    onRemoveHandler() {
        this.service.removeProduct(this.product().product);
    }

    onSubmitHandler() {

        if (this.formGroup.valid) {

            const value = this.formGroup.value;

            const body = value.quantity!;

            this.service.modifyProduct({...this.product(), quantity: Number(body)});

            DialogUtils.CloseModal(this.dialogId());
        }
    }
}