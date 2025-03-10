import { Observable } from "rxjs";
import MenuCategory from "../classes/menu-category.class";

export type SaveMenuCategory = {
    name: string;
    menuId: string;
}

export type UpdateMenuCategory = {
    name: string;
    isActive: boolean;
}

export default interface MenuCategoryRepository {

    save(body: SaveMenuCategory): Observable<string>
    update(id: string, body: UpdateMenuCategory): Observable<string>
    delete(id: string): Observable<string>
    getById(id: string): Observable<MenuCategory | undefined>
    getAll(menuId: string): Observable<MenuCategory[]>
} 