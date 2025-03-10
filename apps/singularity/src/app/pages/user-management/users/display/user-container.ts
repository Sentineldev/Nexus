import { Component, input } from "@angular/core";
import User from "../../../../core/classes/user.class";

@Component({
    selector: `app-user-container`,
    template: `
    <fieldset class="border p-3 rounded-sm  border-slate-400">
        <legend>Usuario</legend>
        <p>{{user().username}}</p>
    </fieldset>
    `
})
export default class UserContainer {


    public user = input.required<User>();
}