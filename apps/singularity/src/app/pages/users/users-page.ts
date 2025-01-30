import { Component, computed, OnInit } from "@angular/core";
import UsersPageService from "./users-page-service";
import SaveUserModal from "./modals/save-user-modal";
import UsersDisplay from "./display/users-display";
import { Loader } from "../../shared/loader/loader";

@Component({
    selector: `app-users-page`,
    template: `
    <div class="p-6 flex flex-col gap-12">
        <app-save-user-modal/>
        <div class="px-1">
            @if (state().loading) {
                <app-loader color="secondary"/>
            }
            @if (!state().loading && state().users.length === 0 ){
                <p class="text-slate-600">No hay usuarios registrados...</p>
            }
            @if (!state().loading && state().users.length > 0) {
                <app-users-display [users]="state().users"/>
            }
        </div>
    </div>
    `,
    imports: [SaveUserModal, UsersDisplay, Loader]
})
export default class UsersPage implements OnInit {



    public state = computed(() =>  this.service.getState());

    constructor(
        private readonly service: UsersPageService
    ) {}
    ngOnInit(): void {
        this.service.getUsers();
    }


}