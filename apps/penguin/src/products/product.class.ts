export type ProductParams = {
  id: string;
  name: string;
  description: string;
};

export default class Product {
  public id: string;
  public name: string;
  public description: string;

  constructor({ id, name, description }: ProductParams) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
