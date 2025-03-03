import { Component, Inject, input, OnInit, signal } from "@angular/core";
import Menu from "../../../classes/menu.class";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Loader } from "../../../../../shared/loader/loader";
import { ErrorAlert } from "../../../../../shared/alerts/error-alert";
import MenuRepository from "../../../interfaces/menu-repository.interface";
import ApiMenuRepository from "../../../../../shared/repositories/api/menu-api.repository";
import { UpdateMenu } from "../../../dto/menu.dto";

@Component({
    selector: `app-update-menu-form`,
    imports: [ReactiveFormsModule, Loader, ErrorAlert],
    template: `
    
    <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="flex flex-col gap-6">
        <label for="is_active" class="flex items-center gap-2  text-wrap ">
            <input formControlName="isActive" class="h-6 w-6" type="checkbox" name="is_active" id="is_active">
            <p class="font-sans text-lg text-slate-700">Habilitar / Deshabilitar</p>
        </label>    
        <label for="name">
            <input formControlName="name" class="border-b border-slate-700 font-sans text-lg w-full outline-hidden py-2" type="text" name="name" id="name" placeholder="Nombre">
        </label>
        <div>
            <button [disabled]="loading()" type="submit" class="bg-slate-700 text-white font-sans text-lg rounded-lg p-3 px-6">
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
    `
})
export default class UpdateMenuForm implements OnInit {

    public menu = input.required<Menu>()

    public loading = signal(false);
    public errorMessage = signal("");

    public formGroup = new FormGroup({
        name: new FormControl("",[Validators.required]),
        isActive: new FormControl(false)
    });
    
    constructor(    
        @Inject(ApiMenuRepository)
        private readonly repository: MenuRepository
    ) {}


    ngOnInit(): void {
        this.formGroup.setValue({
            name: this.menu().name,
            isActive: this.menu().isActive
        })
    }

    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: UpdateMenu = {
                isActive: data.isActive!,
                name: data.name!,
            };
            this.loading.set(true);
            this.repository.update(this.menu().id, body).subscribe((result) => {
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