import { Component, Inject, signal } from "@angular/core";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import UserRepository from "../../../shared/interfaces/user-repository";
import ApiUserRepository from "../api-user-repository";
import { Loader } from "../../../shared/loader/loader";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SaveUserDto } from "../user.dto";
import UsersPageService from "../users-page-service";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";

@Component({
    selector: `app-save-user-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-slate-600">Crear usuario</h1>

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
                    <label for="username">
                        <p class="font-sans text-slate-700">Nombre de Usuario</p>
                        <input formControlName="username" class="border border-slate-300 rounded w-full outline-none p-1" type="text" name="username" id="username"/>
                    </label>
                    <label for="passsword">
                        <p class="font-sans text-slate-700">Clave</p>
                        <input formControlName="password" class="border border-slate-300 rounded w-full outline-none p-1" type="password" name="passsword" id="passsword"/>
                    </label>
                </div>
                <div>
                    <button [disabled]="loading()" class="p-3 bg-slate-700 rounded-lg w-full text-white transition-all" type="submit">
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
    <app-dialog-toggler [dialogId]="dialogId">
        <div class="bg-slate-700 text-white p-3 rounded-lg font-sans transition-all">
            <h1>Crear Usuario</h1>
        </div>
    </app-dialog-toggler>
    `,
    imports: [CustomDialog, DialogToggler, Loader, ReactiveFormsModule, ErrorAlert, SuccessAlert]
})
export default class SaveUserModal {

    public dialogId = "save-user-modal-unique";

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
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}