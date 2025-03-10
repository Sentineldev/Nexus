import { Component, Inject, input, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import UsersPageService from "../users-page-service";
import User from "../../../../core/classes/user.class";
import UserContainer from "../display/user-container";
import { Loader } from "../../../../components/loader/loader";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import UserRepository, { UpdateUserDto } from "../../../../core/interfaces/user-repository";
import ApiUserRepository from "../../../../core/api/api-user-repository";

@Component({
    selector: `app-edit-user-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-primary">Actualizar usuario</h1>
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
                    <app-reactive-form-input
                    label="Nombre de usuario"
                    [id]="'username-'+user().id"
                    [control]="formGroup.controls.username"
                    [errors]="{ required: 'No puede dejar este campo vacio' }"
                    />
                    <app-reactive-form-input
                    label="Nombre Corto"
                    [id]="'shortName-'+user().id"
                    [control]="formGroup.controls.shortName"
                    [errors]="{ required: 'No puede dejar este campo vacio' }"
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
    imports: [ReactiveFormsModule, UserContainer, Loader, ReactiveFormInput, SuccessAlert, ErrorAlert, CustomDialog]
})
export default class SaveUserModal implements OnInit {

    public dialogId = input.required<string>();

    public user = input.required<User>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        shortName: new FormControl("", [Validators.required]),
    });

    constructor(
        @Inject(ApiUserRepository)
        private readonly repository: UserRepository,
        private readonly pageService: UsersPageService
    ) {}
    ngOnInit(): void {
        this.formGroup.setValue({
            username: this.user().username,
            shortName: this.user().shortName
        })
    }


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: UpdateUserDto = {
                username: data.username!,
                shortName: data.shortName!,
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.update(this.user().id,body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Usuario actualizado correctamente");
                        this.pageService.getUsers();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}