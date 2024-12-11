import { PageData, PageFilter } from '../shared/types/pagination';
import Product from './product.class';

export default interface ProductRepository {
  save(body: Product): Promise<void>;
  update(body: Product): Promise<void>;
  delete(id: string): Promise<void>;

  getById(id: string): Promise<Product | undefined>;
  getByName(name: string): Promise<Product | undefined>;
  getPage(filter: PageFilter<object>): Promise<PageData<Product>>;
}
