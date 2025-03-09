import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import EmployeeRepository from "../../../core/interfaces/employee-repository.interface";
import ApiEmployeeRepository from "../../../core/api/api-employee-repository";
import { PageData, PageFilter } from "../../../core/types/pagination";
import Employee from "../../../core/classes/employee.class";


type ServiceState = {

    filter: PageFilter<{}>;
    data: PageData<Employee> | undefined;
    loading: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class EmployeesPageService {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiEmployeeRepository)
        private readonly repository: EmployeeRepository
    ) {

        this.state = signal<ServiceState>({
            loading: false,
            data: undefined,
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            }
        });
    }

    getState() {
        return this.state();
    }


    fetch() {
        this.getPage(this.state().filter);
    }

    getPage(filter: PageFilter<{}>) {

        this.state.update((current) => ({ ...current, loading: true, filter }));

        this.repository.getPage(filter).subscribe((data) => {

            this.state.update((current) => ({ ...current, data, loading: false }));
        });
    }

}