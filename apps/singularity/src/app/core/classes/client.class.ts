export type ClientParams = {
    id: string;
    fullName: string;
    email: string;
    identification: string;
    identificationType: string;
};
export default class Client {
    public id: string;
    public fullName: string;
    public email: string;
    public identification: string;
    public identificationType: string;

    constructor(params: ClientParams) {

        const { id, fullName, email, identification, identificationType } = params;
        
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.identification = identification;
        this.identificationType = identificationType;
    }


}