export type UserParams = {
    id: string;
    username: string;
}
export default class User {

    public id: string;
    public username: string;


    constructor({ id, username }: UserParams) {

        this.id = id;
        this.username = username;
    }
}