import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import MenuService from '../services/menu.service';
import { SaveMenuDto } from '../dto/menu.dto';

@Controller('menus')
export default class MenuController {
  constructor(private readonly repository: MenuService) {}

  @Post('')
  save(@Body() body: SaveMenuDto) {
    return this.repository.save(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.repository.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: SaveMenuDto) {
    return this.repository.update(id, body);
  }

  @Get(':restaurantId')
  getPage(@Param('restaurantId') restaurantId: string) {
    return this.repository.getAll(restaurantId);
  }
}
