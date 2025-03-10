import { Component, computed, input } from "@angular/core";
import Employee from "../../../../core/classes/employee.class";
import DialogToggler from "../../../../components/dialog/dialog-toggler";
import UpdateUserModal from "../modals/update-employee-modal";
import DeleteEmployeeModal from "../modals/delete-employee-modal";

@Component({
    selector: `app-employee-display`,
    template: `
    <app-update-employee-modal [dialogId]="updateDialogId()" [employee]="employee()"/>
    <app-delete-employee-modal [dialogId]="deleteDialogId()" [employee]="employee()"/>
    <div class="grid grid-cols-4 items-center">
        <div class="flex flex-col ">
            <h1>{{ employee().firstNames }} {{employee().lastNames}}</h1>
            <p class="text-primary">{{employee().identification}}</p>
        </div>
        <div>
            <h1>{{ employee().position }}</h1>
        </div>
        <div>
            <h1>{{ employee().department }}</h1>
        </div>
        <div class="flex items-center gap-4">
            <app-dialog-toggler [dialogId]="updateDialogId()">
                <div class="btn">
                    <img class="" src="./svg/edit-svgrepo-com.svg" alt="trash-icon" width="24" height="24">
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
    imports: [DialogToggler, UpdateUserModal, DeleteEmployeeModal]
})
export default class EmployeeDisplay {


    public employee = input.required<Employee>();

    public updateDialogId = computed(() => `employee-update-dialog-${this.employee().id}`);
    public deleteDialogId = computed(() => `employee-delete-dialog-${this.employee().id}`);
}