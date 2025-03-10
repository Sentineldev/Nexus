import { Component, computed, input } from "@angular/core";
import User from "../../../../core/classes/user.class";
import SaveUserModal from "../modals/edit-user-modal";
import ChangePasswordModal from "../modals/change-password-modal";
import DeleteUserModal from "../modals/delete-user-modal";
import DialogToggler from "../../../../components/dialog/dialog-toggler";

@Component({
    selector: `app-user-display`,
    template: `
    <app-edit-user-modal [user]="user()" [dialogId]="updateDialogId()"/>
    <app-change-password-modal [user]="user()" [dialogId]="updateUserPasswordDialogId()"/>
    <app-delete-user-modal [user]="user()" [dialogId]="deleteDialogId()"/>
    <div class="grid grid-cols-3 items-center">
        <div class="flex flex-col">
            <h1 class="font-medium text-xl">{{user().employee.firstNames}} {{user().employee.lastNames}}</h1>
            <p>{{user().employee.identification}}</p>
        </div>
        <div>
            <h1 class="font-medium text-xl">{{user().username}}</h1>
        </div>
        <div class="flex gap-4">
            <app-dialog-toggler [dialogId]="updateDialogId()">
                <div class="btn">
                    <img class="" src="./svg/edit-svgrepo-com.svg" alt="trash-icon" width="24" height="24">
                </div>
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="updateUserPasswordDialogId()">
                <div class="btn">
                    <img class="" src="./svg/password-reset.svg" alt="trash-icon" width="24" height="24">
                </div>
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="deleteDialogId()">
                <div class="btn">
                    <img class="" src="./svg/trash-svgrepo-com.svg" alt="trash-icon" width="24" height="24">
                </div>
            </app-dialog-toggler>
        </div>
    </div>
    `,
    imports: [SaveUserModal, ChangePasswordModal, DeleteUserModal, DialogToggler]
})
export default class UserDisplay {


    
    public user = input.required<User>()
    public updateDialogId = computed(() => `edit-user-modal-unique-${this.user().id}`);
    public updateUserPasswordDialogId = computed(() => `change-password-user-modal-unique-${this.user().id}`);
    public deleteDialogId = computed(() => `delete-user-modal-unique-${this.user().id}`);
}
