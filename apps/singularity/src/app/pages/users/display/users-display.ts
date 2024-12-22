import { Component, input } from "@angular/core";
import User from "../user.class";
import UserDisplay from "./user-display";

@Component({
    selector: `app-users-display`,
    template: `

        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4 items-center justify-center">
                <div>
                    <h1 class="text-slate-700 font-sans text-xl font-bold">Usuario</h1>
                </div>
                <div></div>
            </div>
            <div class="flex flex-col gap-6">
                @for (user of users(); track user.id) {
                    <app-user-display [user]="user"/>
                }
            </div>
        </div>
    `,
    imports: [UserDisplay]
})
export default class UsersDisplay {

    public users = input.required<User[]>();
}