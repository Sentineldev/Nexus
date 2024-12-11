import { Injectable } from '@nestjs/common';
import { PRODUCTS } from '../shared/data';
import { PageFilter, PageData } from '../shared/types/pagination';
import ProductRepository from './product-repository.interface';
import Product from './product.class';

@Injectable()
export default class LocalProductRepository implements ProductRepository {
  save(body: Product): Promise<void> {
    PRODUCTS.push(body);

    return;
  }
  update(body: Product): Promise<void> {
    const index = PRODUCTS.findIndex((val) => val.id === body.id);
    PRODUCTS[index] = body;
    return;
  }
  delete(id: string): Promise<void> {
    const index = PRODUCTS.findIndex((val) => val.id === id);
    PRODUCTS.splice(index, 1);

    return;
  }
  getById(id: string): Promise<Product | undefined> {
    const result = PRODUCTS.find((val) => val.id === id);
    return new Promise((resolve) => {
      resolve(result);
    });
  }

  getByName(name: string): Promise<Product | undefined> {
    const result = PRODUCTS.find(
      (val) => val.name.toLowerCase() === name.toLowerCase(),
    );
    return new Promise((resolve) => {
      resolve(result);
    });
  }

  getPage(filter: PageFilter<object>): Promise<PageData<Product>> {
    const start = (filter.page - 1) * filter.pageSize;
    const end = start + filter.pageSize;

    const data = PRODUCTS.slice(start, end);
    const dataSize = PRODUCTS.length;

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
