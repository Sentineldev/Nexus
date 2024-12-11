import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PageQueryDto {
  @IsNotEmpty()
  @Transform((v) => Number(v.value))
  @IsNumber()
  public page: number = 1;

  @IsNotEmpty()
  @Transform((v) => Number(v.value))
  @IsNumber()
  public pageSize: number = 5;
}
