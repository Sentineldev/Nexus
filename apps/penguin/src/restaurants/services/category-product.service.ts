import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CategoryProductRepository from '../interfaces/category-product-repository.interface';
import LocalCategoryProductRepository from '../repositories/local-category-product.repository';
import { SaveCategoryProduct } from '../dto/category-product.dto';
import ProductsService from '../../products/products.service';
import MenuCategoryService from './menu-category.service';
import CategoryProduct from '../classes/category-product.class';
import { PageData, PageFilter } from '../../shared/types/pagination';

@Injectable()
export default class CategoryProductService {
  constructor(
    @Inject(LocalCategoryProductRepository)
    private readonly repository: CategoryProductRepository,
    private readonly productService: ProductsService,
    private readonly menuCategoryService: MenuCategoryService,
  ) {}

  async save(body: SaveCategoryProduct): Promise<void> {
    const exists = await this.repository.getByProductId(
      body.categoryId,
      body.productId,
    );

    if (exists) {
      throw new ConflictException('Product already exists');
    }

    const product = await this.productService.getById(body.productId);
    const category = await this.menuCategoryService.getById(body.categoryId);

    const newCategoryProduct = CategoryProduct.NewProduct({
      id: new Date().getTime().toString(),
      category: category,
      product: product,
      price: body.price,
    });

    await this.repository.save(newCategoryProduct);

    return;
  }

  async update(id: string, body: SaveCategoryProduct): Promise<void> {
    const current = await this.getById(id);

    const updated = CategoryProduct.Product({
      ...current,
      price: body.price,
    });

    await this.repository.update(updated);

    return;
  }

  async getById(id: string): Promise<CategoryProduct> {
    const result = await this.repository.getById(id);

    if (!result) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async getPage(
    filter: PageFilter<object>,
  ): Promise<PageData<CategoryProduct>> {
    return await this.repository.getPage(filter);
  }
}
