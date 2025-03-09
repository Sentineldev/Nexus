export type EmployeeParams = {
    id: string;
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
export default class Employee {

    public id: string;
    public firstNames: string;
    public lastNames: string;
    public identification: string;
    public personalEmail: string;
    public corporativeEmail: string;
    public department: string;
    public position: string;
    public jobEntryDate: string;
    public jobDepartureDate: string;

    constructor(params: EmployeeParams) {

        const { id, firstNames, lastNames, identification, personalEmail, corporativeEmail, department, position, jobDepartureDate, jobEntryDate } = params;
        
        this.id = id;
        this.firstNames = firstNames;
        this.lastNames = lastNames;
        this.identification = identification;
        this.personalEmail = personalEmail;
        this.corporativeEmail = corporativeEmail;
        this.department = department;
        this.position = position;
        this.jobEntryDate = jobEntryDate;
        this.jobDepartureDate = jobDepartureDate;
    }
}