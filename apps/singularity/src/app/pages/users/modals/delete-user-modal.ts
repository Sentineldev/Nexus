import { Component, Inject, input, signal } from "@angular/core";
import CustomDialog from "../../../shared/dialog/custom-dialog";
import UserRepository from "../../../shared/interfaces/user-repository";
import { Loader } from "../../../shared/loader/loader";
import UsersPageService from "../users-page-service";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import { SuccessAlert } from "../../../shared/alerts/success-alert";
import User from "../user.class";
import UserContainer from "../display/user-container";
import ApiUserRepository from "../../../shared/repositories/api/api-user-repository";

@Component({
    selector: `app-delete-user-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-primary">Eliminar usuario</h1>

            
            @if (errorMessage().length > 0 || successMessage().length > 0) {

                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <app-user-container [user]="user()"/>
            <div class="w-full flex flex-col gap-6">
                <div>
                    <button (click)="onSubmitHandler()" [disabled]="loading()" class="btn w-full" type="button">
                        @if (loading()) {
                            <app-loader/>
                        } @else {
                            Eliminar
                        }
                    </button>
                </div>
            </div>
        </div>
        
    </app-custom-dialog>
    `,
    imports: [CustomDialog, Loader, ErrorAlert, SuccessAlert, UserContainer]
})
export default class DeleteUserModal {

    public dialogId = input.required<string>();
    public user  = input.required<User>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    constructor(
        @Inject(ApiUserRepository)
        private readonly repository: UserRepository,
        private readonly pageService: UsersPageService
    ) {}


    onSubmitHandler() {
        this.loading.set(true);
        this.errorMessage.set("");
        this.successMessage.set("");
        this.repository.delete(this.user().id).subscribe((result) => {
            setTimeout(() => {
                if (result.length === 0) {
                    this.successMessage.set("Usuario eliminado correctamente");
                    this.pageService.getUsers();
                    return;
                }
                this.loading.set(false);
                this.errorMessage.set(result);
            }, 1000);
        })
    }
}