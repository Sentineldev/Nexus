import { Component, Inject, input, OnInit, signal } from "@angular/core";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import UserRepository from "../../../shared/interfaces/user-repository";
import { Loader } from "../../../shared/loader/loader";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UpdateUserPasswordDto } from "../user.dto";
import UsersPageService from "../users-page-service";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import User from "../user.class";
import UserContainer from "../display/user-container";
import ApiUserRepository from "../../../shared/repositories/api/api-user-repository";
import ReactiveFormPasswordInput from "../../../shared/forms/reactive-password-input";

@Component({
    selector: `app-change-password-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-primary">Actualizar clave</h1>
            @if (errorMessage().length > 0 || successMessage().length > 0) {
                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <app-user-container [user]="user()"/>
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    
                    <app-reactive-form-password-input
                    label="Ingrese nueva clave"
                    [id]="'password-'+user().id"
                    [control]="formGroup.controls.password"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
                </div>
                <div>
                    <button [disabled]="loading()" class="btn w-full" type="submit">
                        @if (loading()) {
                            <app-loader/>
                        } @else {
                            Actualizar
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog, Loader, ReactiveFormsModule, ErrorAlert, SuccessAlert, UserContainer, ReactiveFormPasswordInput]
})
export default class ChangePasswordModal {

    public dialogId = input.required<string>();

    public user = input.required<User>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public formGroup = new FormGroup({
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

            const body: UpdateUserPasswordDto = {
                password: data.password!,
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.changePassword(this.user().id,body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Clave actualizada correctamente");
                        this.pageService.getUsers();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}