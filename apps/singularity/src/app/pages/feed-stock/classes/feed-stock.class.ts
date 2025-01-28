export type FeedStockParams = {
    id: string;
    name: string;
    unit: string;
}
export default class FeedStock {

    public id: string;
    public name: string;
    public unit: string;

    constructor({ id, name, unit }: FeedStockParams) {

        this.id = id;
        this.name = name;
        this.unit = unit;
    }
}