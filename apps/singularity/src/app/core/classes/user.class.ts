import Employee from "./employee.class";

export type UserParams = {
    id: string;
    username: string;
    employee: Employee;
}
export default class User {

    public id: string;
    public username: string;
    public employee: Employee;

    constructor({ id, username, employee }: UserParams) {

        this.id = id;
        this.username = username;
        this.employee = employee;
    }
}