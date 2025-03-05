import { Component, input, signal, Inject } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import ReactiveFormInput from "../../../shared/forms/reactive-input";
import { Loader } from "../../../shared/loader/loader";
import Menu from "../../restaurants/classes/menu.class";
import CategoriesPageService2 from "./categories-page.service";
import { SaveMenuCategory } from "../../restaurants/dto/menu-category.dto";
import MenuCategoryRepository from "../../restaurants/interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../shared/repositories/api/menu-category-api.repository";


@Component({
    selector: `app-create-category-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="shadow-xl bg-white rounded-xl p-6  w-full lg:w-[450px] flex flex-col gap-6">
            <div>
                <h1 class="text-black font-medium text-center text-xl">Crear Categoria</h1>
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
                    id="name"
                    [control]="form.controls.name"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button type="submit" [disabled]="loading()" class="btn">
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
export default class CreateCategoryModal {


    public menu = input.required<Menu>();
    public dialogId = input.required<string>();

    public errorMessage = signal<string>("");
    public successMessage = signal<string>("");
    public loading = signal<boolean>(false);

    public form = new FormGroup({
        name: new FormControl<string>("",[Validators.required])
    });

    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository,
        private readonly service: CategoriesPageService2,
    ) {}


    onSubmitHandler() {

        if (this.form.valid) {
            this.errorMessage.set("");
            this.successMessage.set("");
            const value = this.form.value;
            const body: SaveMenuCategory = {
                menuId: this.menu().id,
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