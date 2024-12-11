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
import CategoryProductService from '../services/category-product.service';
import {
  CategoryProductsPageQuery,
  SaveCategoryProduct,
} from '../dto/category-product.dto';

@Controller('category-products')
export default class CategoryProductController {
  constructor(private readonly service: CategoryProductService) {}

  @Post('')
  save(@Body() body: SaveCategoryProduct) {
    return this.service.save(body);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: SaveCategoryProduct) {
    return this.service.update(id, body);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('')
  getPage(@Query() filter: CategoryProductsPageQuery) {
    return this.service.getPage({
      page: filter.page,
      pageSize: filter.pageSize,
      filter: {},
    });
  }
}
