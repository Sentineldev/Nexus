import { Component, Inject, input, signal } from "@angular/core";
import User from "../../../../core/classes/user.class";
import { Loader } from "../../../../components/loader/loader";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import UserRepository from "../../../../core/interfaces/user-repository";
import ApiUserRepository from "../../../../core/api/api-user-repository";
import EmployeesPageService from "../employees-page.service";
import EmployeeRepository from "../../../../core/interfaces/employee-repository.interface";
import ApiEmployeeRepository from "../../../../core/api/api-employee-repository";
import Employee from "../../../../core/classes/employee.class";

@Component({
    selector: `app-delete-employee-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[380px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-bold text-primary">Eliminar empleado</h1>

            
            @if (errorMessage().length > 0 || successMessage().length > 0) {

                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <p class="font-bold text-xl">Esta seguro de eliminar el usuario? Esta accion no puede revertirse</p>
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
    imports: [Loader, SuccessAlert, ErrorAlert, CustomDialog]
})
export default class DeleteEmployeeModal {

    public dialogId = input.required<string>();
    public employee  = input.required<Employee>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    constructor(
        @Inject(ApiEmployeeRepository)
        private readonly repository: EmployeeRepository,
        private readonly pageService: EmployeesPageService
    ) {}


    onSubmitHandler() {
        this.loading.set(true);
        this.errorMessage.set("");
        this.successMessage.set("");
        this.repository.delete(this.employee().id).subscribe((result) => {
            setTimeout(() => {
                if (result.length === 0) {
                    this.successMessage.set("Usuario eliminado correctamente");
                    this.pageService.fetch();
                    return;
                }
                this.loading.set(false);
                this.errorMessage.set(result);
            }, 1000);
        })
    }
}