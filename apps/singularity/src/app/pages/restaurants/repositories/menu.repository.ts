import { Injectable } from "@angular/core";
import MenuRepository from "../interfaces/menu-repository.interface";
import { map, Observable, of, switchMap, tap } from "rxjs";
import Menu from "../classes/menu.class";
import { SaveMenu } from "../dto/menu.dto";
import { MENU_ARRAY, MENU_CATEGORIES, RESTAURANTS } from "../../../data/variables";


@Injectable({
    providedIn: "root"
})
export default class LocalMenuRepository implements MenuRepository {

    constructor() {}
    save({ name, restaurantId }: SaveMenu): Observable<string> {

        const id = new Date().getTime().toString();

        const restaurant = RESTAURANTS.find((val) => val.id === restaurantId);
        return of(restaurant).pipe(
            switchMap(restaurant => {
                if (restaurant) {
                    const newMenu = new Menu({id, name, restaurant, categories: [] });
                    return this.getById(newMenu.id).pipe(
                        switchMap(result => {
                            if (result) {
                                return "Not created";
                            }
                            MENU_ARRAY.push(newMenu);
                            return "Created";
                        })
                    )
                }
                return "Not created";
            })
        )
    }
    delete(id: string): Observable<string> {

        const result = MENU_ARRAY.filter((val) => val.id !== id);
        return of(result).pipe(
            map(() => "Deleted")
        );
    }
    update(id: string, body: SaveMenu): Observable<string> {

        const index = MENU_ARRAY.findIndex((val) => val.id === id);

        return of(index).pipe(
            switchMap((result) => {

                if (result === -1) {
                    return  "Not updated"; 
                }

                return of(result).pipe(
                    tap((result) => { MENU_ARRAY[result].name = body.name }),
                    map(() => "Updated")
                );
            })
        )
    }
    getById(id: string): Observable<Menu | undefined> {
        const result = MENU_ARRAY.find((val) => val.id === id);
        return of(result).pipe(
            map((result) => {
                if (result) {
                    const filtered = MENU_CATEGORIES.filter((val) => val.menu.id === result.id);
                    result.categories = filtered.map((val) => ({ id: val.id, name: val.name }));
                    return result;
                }
                return undefined;
            })
        );
    }
    getAll(restaurantId: string): Observable<Menu[]> {
        const mappedArray = MENU_ARRAY.filter((val) => val.restaurant.id === restaurantId).map((menu) => {
            const filtered = MENU_CATEGORIES.filter((val) => val.menu.id === menu.id);
            menu.categories =  filtered.map((val) => ({ id: val.id, name: val.name }));
            return menu;
        });

        return of(mappedArray);
    }
}