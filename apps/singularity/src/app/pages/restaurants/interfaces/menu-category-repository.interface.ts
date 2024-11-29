import { Observable } from "rxjs";
import { SaveMenuCategory } from "../dto/menu-category.dto";
import MenuCategory from "../classes/menu-category.class";

export default interface MenuCategoryRepository {

    save(body: SaveMenuCategory): Observable<string>
    update(id: string, body: SaveMenuCategory): Observable<string>
    delete(id: string): Observable<string>
    getById(id: string): Observable<MenuCategory | undefined>
} 