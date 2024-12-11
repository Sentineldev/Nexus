import { IsDefined, IsNotEmpty } from 'class-validator';

export class SaveMenuDto {
  @IsDefined()
  @IsNotEmpty()
  public restaurantId: string;
  @IsDefined()
  @IsNotEmpty()
  public name: string;
}
