export default class Restaurant {

    public id: string;
    public name: string;
    public isActive: boolean;

    constructor(id: string, name: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }
}