import { Component, Inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveUserDto } from "../user.dto";
import UsersPageService from "../users-page-service";
import { Loader } from "../../../../shared/loader/loader";
import ReactiveFormPasswordInput from "../../../../shared/forms/reactive-password-input";
import ReactiveFormInput from "../../../../shared/forms/reactive-input";
import { SuccessAlert } from "../../../../shared/alerts/success-alert";
import { ErrorAlert } from "../../../../shared/alerts/error-alert";
import CustomDialog from "../../../../shared/dialog/custom-dialog";
import UserRepository from "../../../../shared/interfaces/user-repository";
import ApiUserRepository from "../../../../shared/repositories/api/api-user-repository";

@Component({
    selector: `app-save-user-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-medium text-primary">Crear usuario</h1>

            @if (errorMessage().length > 0 || successMessage().length > 0) {

                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <app-reactive-form-input
                    label="Nombre de usuario"
                    [id]="'username'"
                    [control]="formGroup.controls.username"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                    <app-reactive-form-password-input
                    label="Clave"
                    [control]="formGroup.controls.password"
                    [id]="'password'"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button [disabled]="loading()" class="btn w-full" type="submit">
                        @if (loading()) {
                            <app-loader/>
                        } @else {
                            Crear
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
   
    `,
    imports: [ReactiveFormsModule, Loader, ReactiveFormPasswordInput, ReactiveFormInput, SuccessAlert, ErrorAlert, CustomDialog]
})
export default class SaveUserModal {

    public dialogId = input.required<string>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
    });

    constructor(
        @Inject(ApiUserRepository)
        private readonly repository: UserRepository,
        private readonly pageService: UsersPageService
    ) {}


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: SaveUserDto = {
                username: data.username!,
                password: data.password!,
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Usuario creado correctamente");
                        this.pageService.getUsers();
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}