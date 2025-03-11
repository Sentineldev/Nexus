
export type ProductParams = {
    id: string;
    name: string;
    description: string;
    group: string;
};
export default class Product {

    public id: string;
    public name: string;
    public description: string;
    public group: string;
    
    constructor({ id,name,description,group  }: ProductParams) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.group = group;
    }
}