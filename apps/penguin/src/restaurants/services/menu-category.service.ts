import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import MenuCategoryRepository from '../interfaces/menu-category-repository.interface';
import LocalMenuCategoryRepository from '../repositories/local-menu-category.repository';
import { SaveMenuCategoryDto } from '../dto/menu-category.dto';
import MenuCategory from '../classes/menu-category.class';
import MenuService from './menu.service';

@Injectable()
export default class MenuCategoryService {
  constructor(
    @Inject(LocalMenuCategoryRepository)
    private readonly repository: MenuCategoryRepository,
    private readonly menuService: MenuService,
  ) {}

  async save(body: SaveMenuCategoryDto): Promise<void> {
    const exists = await this.repository.getByName(body.menuId, body.name);

    if (exists) {
      throw new ConflictException('Menu category already exists');
    }
    const menu = await this.menuService.getById(body.menuId);
    const newMenuCategory = new MenuCategory({
      id: new Date().getTime().toString(),
      menu: menu,
      name: body.name,
    });
    await this.repository.save(newMenuCategory);
    return;
  }

  async update(id: string, body: SaveMenuCategoryDto): Promise<void> {
    const current = await this.getById(id);

    if (body.name !== current.name) {
      const exists = await this.repository.getByName(body.menuId, body.name);
      if (exists) {
        throw new ConflictException('Menu category already exists');
      }
    }
    const updated = new MenuCategory({
      ...current,
      name: body.name,
    });

    await this.repository.update(updated);

    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }

  async getById(id: string): Promise<MenuCategory> {
    const result = await this.repository.getById(id);
    if (!result) {
      throw new NotFoundException('Menu category not found');
    }

    return result;
  }
}
