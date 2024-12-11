import { PageQueryDto } from '../shared/dto/pagination';

export class SaveProductDto {
  public name: string;
  public description: string;
}

export class ProductPageQuery extends PageQueryDto {}
