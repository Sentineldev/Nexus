import { Component, Inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import MenuCategory from "../../../core/classes/menu-category.class";
import MenuCategoryRepository, { UpdateMenuCategory } from "../../../core/interfaces/menu-category-repository.interface";
import { ErrorAlert } from "../../../components/alerts/error-alert";
import { Loader } from "../../../components/loader/loader";
import ApiMenuCategoryRepository from "../../../core/api/menu-category-api.repository";
import ReactiveFormInput from "../../../components/forms/reactive-input";
import { IsActiveValues } from "../../../core/types/globa";

@Component({
    selector: `app-update-menu-category-form`,
    imports: [ReactiveFormsModule, ErrorAlert, Loader, ReactiveFormInput],
    template: `
    
    <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="flex flex-col gap-6">
        <label for="is_active" class="flex items-center gap-2  text-wrap ">
            <input formControlName="isActive" class="h-6 w-6 accent-primary" type="checkbox" name="is_active" id="is_active">
            <p class="font-sans text-lg text-black font-medium">Habilitar / Deshabilitar</p>
        </label>    
        <app-reactive-form-input
        [control]="formGroup.controls.name"
        label="Nombre"
        [id]="'name'"
        [errors]="{ required: 'No puedes dejar este campo vacio' }"
        />
        <div class="w-fit">
            <button [disabled]="loading()" type="submit" class="btn">
                @if (loading()) {
                    <app-loader/>
                } @else {
                    Actualizar
                }
            </button>
        </div>
    </form>
    @if (errorMessage().length > 0) {
        <div class="py-4">
            <app-error-alert [message]="errorMessage()"/>
        </div>
    }
    `,
})
export default class UpdateMenuCategoryForm {

    public category = input.required<MenuCategory>()

    public loading = signal(false);
    public errorMessage = signal("");

    public formGroup = new FormGroup({
        name: new FormControl("",[Validators.required]),
        isActive: new FormControl(false)
    });
    
    constructor(    
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {}


    ngOnInit(): void {
        this.formGroup.setValue({
            name: this.category().name,
            isActive: this.category().isActive
        })
    }

    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: UpdateMenuCategory = {
                isActive: JSON.stringify(data.isActive!) as IsActiveValues,
                name: data.name!,
            };
            this.loading.set(true);
            this.repository.update(this.category().id, body).subscribe((result) => {
                setTimeout(() => {
                    if (result.length === 0) {
                        window.location.reload();
                        return;
                    }
                    this.errorMessage.set(result);
                    this.loading.set(false);
                }, 1000);
            })
        }
    }
}