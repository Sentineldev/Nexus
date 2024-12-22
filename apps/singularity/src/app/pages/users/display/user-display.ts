import { Component, computed, input } from "@angular/core";
import User from "../user.class";
import SaveUserModal from "../modals/edit-user-modal";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import ChangePasswordModal from "../modals/change-password-modal";
import DeleteUserModal from "../modals/delete-user-modal";

@Component({
    selector: `app-user-display`,
    template: `

    <app-edit-user-modal [user]="user()" [dialogId]="updateUserModalId()"/>
    <app-change-password-modal [user]="user()" [dialogId]="updateUserPasswordModalId()"/>
    <app-delete-user-modal [user]="user()" [dialogId]="deleteUserModalId()"/>
    <div class="grid grid-cols-2 items-center justify-center">
        <div>
            <h1 class="font-sans text-slate-700 text-lg"> {{user().username}} </h1>
        </div>
        <div class="flex items-center justify-center gap-3">
            <app-dialog-toggler [dialogId]="updateUserModalId()">
                <img src="./svg/user-edit-svgrepo-com.svg" width="32" height="32" alt="Edit user icon">
            </app-dialog-toggler>  
            <app-dialog-toggler [dialogId]="updateUserPasswordModalId()">
                <img src="./svg/password-account-security-reset-safety-svgrepo-com.svg" width="32" height="32" alt="Edit user icon">
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="deleteUserModalId()">
                <img src="./svg/trash-svgrepo-com-red.svg" width="32" height="32" alt="Edit user icon">
            </app-dialog-toggler>    
        </div>
    </div>
    `,
    imports: [SaveUserModal, DialogToggler, ChangePasswordModal, DeleteUserModal]
})
export default class UserDisplay {


    
    public user = input.required<User>()
    public updateUserModalId = computed(() => `edit-user-modal-unique-${this.user().id}`);
    public updateUserPasswordModalId = computed(() => `change-password-user-modal-unique-${this.user().id}`);
    public deleteUserModalId = computed(() => `delete-user-modal-unique-${this.user().id}`);
}
