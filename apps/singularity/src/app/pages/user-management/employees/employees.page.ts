import { Component, computed, OnInit, signal } from "@angular/core";
import RegisterEmployeeModal from "./modals/register-employee-modal";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import { Loader } from "../../../components/loader/loader";
import EmployeesPageService from "./employees-page.service";
import EmployeesDisplay from "./display/employees.display";

@Component({

    selector: `app-employees-page`,
    template: `
    <app-register-employee-modal [dialogId]="dialogId()"/>
    <div class="p-12 flex flex-col gap-6">
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        <div class="flex flex-col gap-8">
            <div class="flex items-center gap-8">
                <div class="flex-1">
                    <div class="search-bar">
                        <img src="/svg/search-svgrepo-com.svg" alt="">
                        <input type="text" name="search" id="search" placeholder="Buscar Empleado... ">
                    </div>
                </div>
                <app-dialog-toggler [dialogId]="dialogId()">
                    <div class="btn">
                        <h1>Registrar empleado</h1>
                    </div>
                </app-dialog-toggler>
            </div>
            
            @if (!state().loading && state().data && state().data!.data.length === 0 ){
                <p class="text-slate-600">No hay empleados registrados...</p>
            }
            @if (!state().loading &&  state().data && state().data!.data && state().data!.data.length > 0) {
                <app-employees-display [employees]="state().data!.data"/>
            }
        </div>
    </div>
    `,
    imports: [RegisterEmployeeModal, DialogToggler, Loader, EmployeesDisplay]
})
export default class EmployeesPage implements OnInit {

    public dialogId = signal<string>("register-employee-modal");

    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: EmployeesPageService,
    ) {}
    ngOnInit(): void {
        this.service.fetch()
    }
}