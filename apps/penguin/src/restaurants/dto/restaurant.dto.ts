import { IsDefined, IsNotEmpty } from 'class-validator';
import { PageQueryDto } from '../../shared/dto/pagination';

export class SaveRestaurantDto {
  @IsDefined()
  @IsNotEmpty()
  public name: string;
}
export class RestaurantPageQuery extends PageQueryDto {}
