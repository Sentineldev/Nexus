import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import MenuRepository from '../interfaces/menu-repository.interface';
import LocalMenuRepository from '../repositories/local-menu.repository';
import { SaveMenuDto } from '../dto/menu.dto';
import Menu from '../classes/menu.class';
import RestaurantService from './restaurant.service';

@Injectable()
export default class MenuService {
  constructor(
    @Inject(LocalMenuRepository)
    private readonly repository: MenuRepository,
    private readonly restaurantService: RestaurantService,
  ) {}

  async save(body: SaveMenuDto): Promise<void> {
    const exists = await this.repository.getByName(
      body.restaurantId,
      body.name,
    );

    if (exists) {
      throw new ConflictException('Menu already exists');
    }

    const restaurant = await this.restaurantService.getById(body.restaurantId);

    const newMenu = Menu.NewMenu({
      id: new Date().getTime().toString(),
      name: body.name,
      restaurant: restaurant,
    });

    await this.repository.save(newMenu);

    return;
  }

  async update(id: string, body: SaveMenuDto): Promise<void> {
    const current = await this.getById(id);

    if (current.name !== body.name) {
      const exists = await this.repository.getByName(
        body.restaurantId,
        body.name,
      );
      if (exists) {
        throw new ConflictException('Menu already exists');
      }
    }

    const updated = Menu.Menu({
      ...current,
      name: body.name,
    });

    await this.repository.update(updated);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getById(id: string): Promise<Menu> {
    const result = await this.repository.getById(id);

    if (!result) {
      throw new NotFoundException('Menu not found');
    }
    return result;
  }

  async getAll(restaurantId: string) {
    return await this.repository.getAll(restaurantId);
  }
}
