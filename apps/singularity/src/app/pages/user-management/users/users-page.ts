import { Component, computed, OnInit, signal } from "@angular/core";
import UsersPageService from "./users-page-service";
import UsersDisplay from "./display/users-display";
import { Loader } from "../../../components/loader/loader";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import CreateUserModal from "./modals/create-user-modal";

@Component({
    selector: `app-users-page`,
    template: `
    <app-create-user-modal [dialogId]="dialogId()"/>
    <div class="p-12 flex flex-col gap-6">
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        <div>
            <div class="flex items-center gap-8">
                <div class="flex-1">
                    <div class="search-bar">
                        <img src="/svg/search-svgrepo-com.svg" alt="">
                        <input type="text" name="search" id="search" placeholder="Buscar Usuario... ">
                    </div>
                </div>
                <app-dialog-toggler [dialogId]="dialogId()">
                    <div class="btn">
                        <h1>Crear Usuario</h1>
                    </div>
                </app-dialog-toggler>
            </div>
            
            @if (!state().loading && state().users.length === 0 ){
                <p class="text-slate-600">No hay usuarios registrados...</p>
            }
            @if (!state().loading && state().users.length > 0) {
                <app-users-display [users]="state().users"/>
            }
        </div>
    </div>
    `,
    imports: [UsersDisplay, Loader, DialogToggler, CreateUserModal]
})
export default class UsersPage implements OnInit {


    public dialogId = signal<string>("save-user-modal");
    public state = computed(() =>  this.service.getState());

    constructor(
        private readonly service: UsersPageService
    ) {}
    ngOnInit(): void {
        this.service.getUsers();
    }


}