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
import ProductsService from './products.service';
import { ProductPageQuery, SaveProductDto } from './product.dto';

@Controller('products')
export default class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post('')
  save(@Body() body: SaveProductDto) {
    return this.service.save(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: SaveProductDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('')
  getPage(@Query() query: ProductPageQuery) {
    return this.service.getPage({
      filter: {},
      ...query,
    });
  }
}
