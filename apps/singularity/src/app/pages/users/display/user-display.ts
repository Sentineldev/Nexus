import { Component, computed, input } from "@angular/core";
import User from "../user.class";
import SaveUserModal from "../modals/edit-user-modal";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import ChangePasswordModal from "../modals/change-password-modal";
import DeleteUserModal from "../modals/delete-user-modal";

@Component({
    selector: `app-user-display`,
    styles: `
        .dropdown {
            display: none;
        }
        .dropdown-toggler:hover + .dropdown {
            display: inherit;

        }
        .dropdown:hover ~ .dropdown-toggler {
            background-color: red;
        }
        .dropdown:hover {
            display: inherit;
        }
    `,
    template: `
    <app-edit-user-modal [user]="user()" [dialogId]="updateDialogId()"/>
    <app-change-password-modal [user]="user()" [dialogId]="updateUserPasswordDialogId()"/>
    <app-delete-user-modal [user]="user()" [dialogId]="deleteDialogId()"/>
    <!-- <div class="grid grid-cols-2 items-center justify-center">
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
    </div> -->
    <div class="relative">
        <div class="flex flex-col dropdown-toggler cursor-pointer">
            <h1 class="text-2xl text-slate-700">{{user().username}}</h1>
        </div>
        <div class="dropdown absolute  bg-white shadow-lg border w-44 z-50">
            <ul class="w-full">
                <li>
                    <app-dialog-toggler [dialogId]="updateDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44  text-start font-sans text-sm">Actualizar</div>
                    </app-dialog-toggler>
                </li>
                <li>
                    <app-dialog-toggler [dialogId]="updateUserPasswordDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44  text-start font-sans text-sm">Cambiar Contraseña</div>
                    </app-dialog-toggler>
                </li>
                <li>
                    <app-dialog-toggler [dialogId]="deleteDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44 text-start font-sans text-sm">Eliminar</div>
                    </app-dialog-toggler>
                    <!-- <button (click)="openModal('delete')" class="hover:bg-slate-200 p-3 text-start w-full font-sans text-sm">Remover</button> -->
                </li>
            </ul>
        </div>
    </div>
    `,
    imports: [SaveUserModal, DialogToggler, ChangePasswordModal, DeleteUserModal]
})
export default class UserDisplay {


    
    public user = input.required<User>()
    public updateDialogId = computed(() => `edit-user-modal-unique-${this.user().id}`);
    public updateUserPasswordDialogId = computed(() => `change-password-user-modal-unique-${this.user().id}`);
    public deleteDialogId = computed(() => `delete-user-modal-unique-${this.user().id}`);
}
