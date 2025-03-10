import Employee from "./employee.class";

export type UserParams = {
    id: string;
    username: string;
    shortName: string;
    employee: Employee;
}
export default class User {

    public id: string;
    public username: string;
    public shortName: string;
    public employee: Employee;

    constructor({ id, username, shortName, employee }: UserParams) {

        this.id = id;
        this.username = username;
        this.shortName = shortName;
        this.employee = employee;
    }
}