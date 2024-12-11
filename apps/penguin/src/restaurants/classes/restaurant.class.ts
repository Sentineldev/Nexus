export type RestaurantParams = {
  id: string;
  name: string;
};
export default class Restaurant {
  public id: string;
  public name: string;

  constructor({ id, name }: RestaurantParams) {
    this.id = id;
    this.name = name;
  }
}
