import { Observable } from "rxjs";
import Menu from "../classes/menu.class";
import { IsActiveValues } from "../types/globa";

export type SaveMenu = {
    restaurantId: string;
    name: string;
};

export type UpdateMenu = {
    name: string;
    isActive: IsActiveValues;
};

export default interface MenuRepository {


    save(body: SaveMenu): Observable<string>;
    delete(id: string): Observable<string>;
    update(id: string, body: UpdateMenu): Observable<string>;
    getById(id: string): Observable<Menu | undefined>;
    getAll(restaurantId: string): Observable<Menu[]>
}