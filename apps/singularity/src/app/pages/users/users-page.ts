import { Component, computed, OnInit } from "@angular/core";
import UsersPageService from "./users-page-service";
import SaveUserModal from "./modals/save-user-modal";
import UsersDisplay from "./display/users-display";

@Component({
    selector: `app-users-page`,
    template: `
    <div class="p-6 flex flex-col gap-12">
        <app-save-user-modal/>
        <div class="px-1">
            <app-users-display [users]="state().users"/>
        </div>
    </div>
    `,
    imports: [SaveUserModal, UsersDisplay]
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