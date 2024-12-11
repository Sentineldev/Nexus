import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ProductRepository from './product-repository.interface';
import LocalProductRepository from './local-product.repository';
import { SaveProductDto } from './product.dto';
import Product from './product.class';
import { PageData, PageFilter } from '../shared/types/pagination';

@Injectable()
export default class ProductsService {
  constructor(
    @Inject(LocalProductRepository)
    private readonly repository: ProductRepository,
  ) {}

  async save(body: SaveProductDto): Promise<void> {
    const exists = await this.repository.getByName(body.name);

    if (exists) {
      throw new ConflictException('Product already exists');
    }

    const newProduct = new Product({
      id: new Date().getTime().toString(),
      ...body,
    });

    await this.repository.save(newProduct);

    return;
  }

  async update(id: string, body: SaveProductDto): Promise<void> {
    const current = await this.getById(id);

    if (current.name !== body.name) {
      const exists = await this.repository.getByName(body.name);
      if (exists) {
        throw new ConflictException('Product already exists');
      }
    }

    const updated = new Product({
      ...current,
      name: body.name,
      description: body.description,
    });

    await this.repository.update(updated);

    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async getById(id: string): Promise<Product> {
    const result = await this.repository.getById(id);

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }

  async getPage(filter: PageFilter<object>): Promise<PageData<Product>> {
    return await this.repository.getPage(filter);
  }
}
