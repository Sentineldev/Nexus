import { PageData, PageFilter } from '../../shared/types/pagination';
import CategoryProduct from '../classes/category-product.class';

export default interface CategoryProductRepository {
  save(body: CategoryProduct): Promise<void>;
  delete(id: string): Promise<void>;
  update(body: CategoryProduct): Promise<void>;
  getById(id: string): Promise<CategoryProduct | undefined>;
  getByProductId(
    categoryId: string,
    productId: string,
  ): Promise<CategoryProduct | undefined>;
  getPage(filter: PageFilter<object>): Promise<PageData<CategoryProduct>>;
}
