import { Injectable } from '@nestjs/common';
import { CATEGORY_PRODUCTS } from '../../shared/data';
import { PageFilter, PageData } from '../../shared/types/pagination';
import CategoryProduct from '../classes/category-product.class';
import CategoryProductRepository from '../interfaces/category-product-repository.interface';

@Injectable()
export default class LocalCategoryProductRepository
  implements CategoryProductRepository
{
  save(body: CategoryProduct): Promise<void> {
    CATEGORY_PRODUCTS.push(body);
    return;
  }
  delete(id: string): Promise<void> {
    const index = CATEGORY_PRODUCTS.findIndex((val) => val.id === id);

    CATEGORY_PRODUCTS.splice(index, 1);
    return;
  }
  update(body: CategoryProduct): Promise<void> {
    const index = CATEGORY_PRODUCTS.findIndex((val) => val.id === body.id);

    CATEGORY_PRODUCTS[index] = body;
    return;
  }
  getById(id: string): Promise<CategoryProduct | undefined> {
    const result = CATEGORY_PRODUCTS.find((val) => val.id === id);

    return new Promise((resolve) => resolve(result));
  }

  getByProductId(
    categoryId: string,
    productId: string,
  ): Promise<CategoryProduct | undefined> {
    const result = CATEGORY_PRODUCTS.find(
      (val) => val.category.id === categoryId && val.product.id === productId,
    );

    return new Promise((resolve) => resolve(result));
  }

  getPage(filter: PageFilter<object>): Promise<PageData<CategoryProduct>> {
    const start = (filter.page - 1) * filter.pageSize;
    const end = start + filter.pageSize;

    const data = CATEGORY_PRODUCTS.slice(start, end);
    const dataSize = CATEGORY_PRODUCTS.length;

    const pageData = {
      data: data,
      meta: {
        dataSize: dataSize,
        page: filter.page,
        pageSize: filter.pageSize,
      },
    };

    return new Promise((resolve) => {
      resolve(pageData);
    });
  }
}
