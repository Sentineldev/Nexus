import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import MenuCategoryService from '../services/menu-category.service';
import { SaveMenuCategoryDto } from '../dto/menu-category.dto';

@Controller('menu-categories')
export default class MenuCategoryController {
  constructor(private readonly service: MenuCategoryService) {}

  @Post('')
  save(@Body() body: SaveMenuCategoryDto) {
    return this.service.save(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: SaveMenuCategoryDto) {
    return this.service.update(id, body);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }
}
