import { Component, input } from "@angular/core";
import Employee from "../../../../core/classes/employee.class";
import EmployeeDisplay from "./employee.display";

@Component({
    selector: `app-employees-display`,
    template: `
    <div class="flex flex-col gap-8">
        <div class="grid grid-cols-4 text-primary font-medium text-xl border-b-neutral border-b py-4">
            <div>
                <h1>Empleado</h1>
            </div>
            <div>
                <h1>Cargo</h1>
            </div>
            <div>
                <h1>Departamento</h1>
            </div>
            <div>

            </div>
        </div>
        <div class="flex flex-col gap-4">
            @for (employee of employees(); track employee.id) {
                <app-employee-display [employee]="employee"/>
            }
        </div>
    </div>
    `,
    imports: [EmployeeDisplay]
})
export default class EmployeesDisplay {


    public employees = input.required<Employee[]>();
}