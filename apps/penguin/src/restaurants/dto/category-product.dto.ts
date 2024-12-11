import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import { PageQueryDto } from '../../shared/dto/pagination';
import { Transform } from 'class-transformer';

export class SaveCategoryProduct {
  @IsDefined()
  @IsNotEmpty()
  public productId: string;
  @IsDefined()
  @IsNotEmpty()
  public categoryId: string;
  @IsDefined()
  @IsNotEmpty()
  @Transform((v) => Number(v.value))
  @IsNumber()
  public price: number;
}

export class CategoryProductsPageQuery extends PageQueryDto {}
