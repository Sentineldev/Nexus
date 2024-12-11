import { Injectable } from '@nestjs/common';
import RestaurantRepository from '../interfaces/restaurant-repository.interface';
import { PageFilter, PageData } from '../../shared/types/pagination';
import Restaurant from '../classes/restaurant.class';
import { RESTAURANTS } from '../../shared/data';

@Injectable()
export default class LocalRestaurantRepository implements RestaurantRepository {
  save(body: Restaurant): Promise<void> {
    RESTAURANTS.push(body);

    return;
  }
  delete(id: string): Promise<void> {
    const index = RESTAURANTS.findIndex((val) => val.id === id);
    RESTAURANTS.splice(index, 1);
    return;
  }
  update(body: Restaurant): Promise<void> {
    const index = RESTAURANTS.findIndex((val) => val.id === body.id);
    RESTAURANTS[index] = body;
    return;
  }
  getById(id: string): Promise<Restaurant | undefined> {
    const result = RESTAURANTS.find((val) => val.id === id);

    return new Promise((resolve) => resolve(result));
  }
  getByName(name: string): Promise<Restaurant | undefined> {
    const result = RESTAURANTS.find(
      (val) => val.name.toLowerCase() === name.toLowerCase(),
    );

    return new Promise((resolve) => resolve(result));
  }
  getPage(filter: PageFilter<object>): Promise<PageData<Restaurant>> {
    const start = (filter.page - 1) * filter.pageSize;
    const end = start + filter.pageSize;

    const data = RESTAURANTS.slice(start, end);
    const dataSize = RESTAURANTS.length;

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
