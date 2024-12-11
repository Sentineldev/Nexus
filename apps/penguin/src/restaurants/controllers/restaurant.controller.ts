import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import RestaurantService from '../services/restaurant.service';
import { RestaurantPageQuery, SaveRestaurantDto } from '../dto/restaurant.dto';

@Controller('restaurants')
export default class RestaurantController {
  constructor(private readonly service: RestaurantService) {}

  @Post('')
  save(@Body() body: SaveRestaurantDto) {
    return this.service.save(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: SaveRestaurantDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get('')
  getPage(@Query() filter: RestaurantPageQuery) {
    return this.service.getPage({
      page: filter.page,
      pageSize: filter.pageSize,
      filter: {},
    });
  }
}
