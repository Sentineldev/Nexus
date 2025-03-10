import { Observable } from "rxjs";
import { PageData, PageFilter } from "../types/pagination";
import Employee from "../classes/employee.class";

export type SaveEmployeeDto = {
    firstNames: string;
    lastNames: string;
    identification: string;
    personalEmail: string;
    corporativeEmail: string;
    department: string;
    position: string;
    jobEntryDate: string;
    jobDepartureDate: string;
};

export default interface EmployeeRepository {



    save(body: SaveEmployeeDto): Observable<string>;
    update(id: string, body: SaveEmployeeDto): Observable<string>;
    delete(id: string): Observable<string>;
    getPage(filter: PageFilter<{}>): Observable<PageData<Employee>>
}