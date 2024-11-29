import { Inject, Injectable } from "@angular/core";
import MenuCategoryRepository from "../interfaces/menu-category-repository.interface";
import { map, Observable, of, switchMap } from "rxjs";
import { SaveMenuCategory } from "../dto/menu-category.dto";
import MenuCategory from "../classes/menu-category.class";
import MenuRepository from "../interfaces/menu-repository.interface";
import LocalMenuRepository from "./menu.repository";


export let MENU_CATEGORIES: MenuCategory[] = [];
@Injectable({
    providedIn: "root"
})
export default class LocalMenuCategoryRepository implements MenuCategoryRepository {


    constructor(
        @Inject(LocalMenuRepository)
        private readonly menuRepository: MenuRepository
    ) {
    }   
    getById(id: string): Observable<MenuCategory | undefined> {

        const result = MENU_CATEGORIES.find((val) => val.id === id);
        return of(result);
    }

    save({ name, menuId }: SaveMenuCategory): Observable<string> {
        
        const id = new Date().getTime().toLocaleString();

        return this.menuRepository.getById(menuId).pipe(
            switchMap(menu => {

                if (!menu) {
                    return "Not created";
                }
                const newCategory = new MenuCategory({
                    id, menu, name
                });
                return this.getById(id).pipe(
                    switchMap(result => {

                        if (result) {
                            return "Not created";
                        }   
                        MENU_CATEGORIES.push(newCategory);
                        return "Created";
                    })
                )
            })
        )
        

    }
    update(id: string, body: SaveMenuCategory): Observable<string> {

        const index = MENU_CATEGORIES.findIndex((val) => val.id === id);

        return of(index).pipe(
            switchMap(index => {
                if (index === -1) {
                    return "Not updated";
                }
                MENU_CATEGORIES[index].name = body.name;
                return "Updated";
            })
        )
    }
    delete(id: string): Observable<string> {

        const result = MENU_CATEGORIES.filter((val) => val.id !== id);

        return of(result).pipe(
            map(() => "Deleted")
        );
    }


}