import { Inject, Injectable, signal } from "@angular/core";
import { PageData, PageFilter } from "../../../../core/types/pagination";
import Employee from "../../../../core/classes/employee.class";
import EmployeeRepository from "../../../../core/interfaces/employee-repository.interface";
import ApiEmployeeRepository from "../../../../core/api/api-employee-repository";


type ServiceState = {
    employees: PageData<Employee> | undefined;
    loading: boolean;
    filter: PageFilter<{}>;
};
@Injectable({
    providedIn: "root"
})
export default class EmployeesService {


    private state = signal<ServiceState>({
        employees: undefined,
        filter: {
            filter: {},
            page: 1,
            pageSize: 5,
        },
        loading: false,
    })
    constructor(
        @Inject(ApiEmployeeRepository)
        private readonly repository: EmployeeRepository
    ) {}


    getState() {
        return this.state();
    }


    fetch() {
        this.getPage(this.state().filter)
    }
    getPage(filter: PageFilter<{}>) {

        this.state.update((current) => ({ ...current, filter, loading: true }));

        this.repository.getPage(filter).subscribe((employees) => {

            setTimeout(() => {
                this.state.update((current) => ({ ...current, employees, loading: false }));
            }, 1000);
        });
    }
}