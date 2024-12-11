import { IsDefined, IsNotEmpty } from 'class-validator';

export class SaveMenuCategoryDto {
  @IsDefined()
  @IsNotEmpty()
  public menuId: string;
  @IsDefined()
  @IsNotEmpty()
  public name: string;
}
