import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import RestaurantRepository from '../interfaces/restaurant-repository.interface';
import LocalRestaurantRepository from '../repositories/local-restaurant.repository';
import { SaveRestaurantDto } from '../dto/restaurant.dto';
import Restaurant from '../classes/restaurant.class';
import { PageData, PageFilter } from '../../shared/types/pagination';

@Injectable()
export default class RestaurantService {
  constructor(
    @Inject(LocalRestaurantRepository)
    private readonly repository: RestaurantRepository,
  ) {}

  async save(body: SaveRestaurantDto) {
    const exists = await this.repository.getByName(body.name);

    if (exists) {
      throw new ConflictException('Restaurant already exists');
    }

    const newRestaurant = new Restaurant({
      id: new Date().getTime().toString(),
      ...body,
    });

    await this.repository.save(newRestaurant);

    return;
  }

  async update(id: string, body: SaveRestaurantDto): Promise<void> {
    const current = await this.getById(id);

    if (body.name !== current.name) {
      const exists = await this.repository.getByName(body.name);

      if (exists) {
        throw new ConflictException('Restaurant already exists');
      }
    }

    const updated = new Restaurant({
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

  async getById(id: string): Promise<Restaurant> {
    const result = await this.repository.getById(id);

    if (!result) {
      throw new NotFoundException('Restaurant not found');
    }

    return result;
  }

  async getPage(filter: PageFilter<object>): Promise<PageData<Restaurant>> {
    return await this.repository.getPage(filter);
  }
}
