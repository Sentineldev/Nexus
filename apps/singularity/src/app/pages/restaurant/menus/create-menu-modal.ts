import { Component, input, signal, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../components/alerts/error-alert";
import { SuccessAlert } from "../../../components/alerts/success-alert";
import CustomDialog from "../../../components/dialog/custom-dialog";
import ReactiveFormInput from "../../../components/forms/reactive-input";
import { Loader } from "../../../components/loader/loader";
import MenuRepository, { SaveMenu } from "../../../core/interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../core/api/menu-api.repository";
import Restaurant from "../../../core/classes/restaurant.class";
import MenusService from "./menus.service";


@Component({
    selector: `app-create-menu-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-black font-medium text-center text-xl">Crear Menu</h1>
            </div>

            @if (errorMessage().length > 0 || successMessage().length > 0) {
                <div>
                    @if (errorMessage().length > 0) {
                        <app-error-alert [message]="errorMessage()"/>
                    }
                    @if (successMessage().length > 0) {
                        <app-success-alert [message]="successMessage()"/>
                    }
                </div>
            }
            <form (ngSubmit)="onSubmitHandler()" [formGroup]="form" class="flex flex-col gap-6">
                <div>
                    <app-reactive-form-input
                    label="Nombre"
                    [id]="'name'"
                    [control]="form.controls.name"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button type="submit" [disabled]="loading()" class="btn w-full">
                        @if (!loading()) {
                            Crear
                        } @else {
                            <app-loader color="secondary"/>
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, ReactiveFormsModule, ReactiveFormInput, ErrorAlert, SuccessAlert, Loader]
})
export default class CreateMenuModal {


    public restaurant = input.required<Restaurant>();
    public dialogId = input.required<string>();

    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");
    public loading = signal<boolean>(false);

    public form = new FormGroup({
        name: new FormControl<string>("",[Validators.required])
    });

    constructor(
        private readonly service: MenusService,
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository,
    ) {}


    onSubmitHandler() {

        if (this.form.valid) {
            this.errorMessage.set("");
            this.successMessage.set("");
            const value = this.form.value;
            const body: SaveMenu = {
                restaurantId: this.restaurant().id,
                name: value.name!
            };

            this.loading.set(true);
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.form.reset();
                        this.successMessage.set("Creado correctamente");
                        this.service.fetch();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            });
        }
    }
}