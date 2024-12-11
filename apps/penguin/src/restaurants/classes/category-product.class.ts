import Product from '../../products/product.class';
import MenuCategory from './menu-category.class';

export type CategoryProductParams = {
  id: string;
  price: number;
  isEnabled: boolean;
  category: MenuCategory;
  product: Product;
};

export type NewCategoryProductParams = {
  id: string;
  price: number;
  category: MenuCategory;
  product: Product;
};

export default class CategoryProduct {
  public id: string;
  public product: Product;
  public category: MenuCategory;
  public price: number;
  public isEnabled: boolean;

  private constructor(params: CategoryProductParams) {
    const { id, product, category, isEnabled, price } = params;

    this.id = id;
    this.product = product;
    this.category = category;
    this.isEnabled = isEnabled;
    this.price = price;
  }
  static Product(params: CategoryProductParams) {
    return new this(params);
  }
  static NewProduct(params: NewCategoryProductParams) {
    return new this({ ...params, isEnabled: false });
  }
}
