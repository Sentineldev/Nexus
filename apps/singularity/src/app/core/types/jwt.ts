import Employee from "../classes/employee.class";

export type JwtData = {
    exp: number;
    id: string;
    username: string;
    shortName: string;
    employee: Employee;
};