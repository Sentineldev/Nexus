import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import MenuCategoryRepository from "../../../core/interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../core/api/menu-category-api.repository";
import MenuCategory from "../../../core/classes/menu-category.class";


type ServiceState = {
    loading: boolean;
    categories: MenuCategory[];
    menuId: string;
};
@Injectable({
    providedIn: "root"
})
export default class CategoriesPageService2 {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {


        this.state = signal<ServiceState>({
            categories: [],
            loading: false,
            menuId: "",
        });
    }


    getState() {
        return this.state();
    }

    fetch() {
        this.getCategories(this.state().menuId);
    }

    getCategories(menuId: string) {


        this.state.update((current) => ({ ...current, loading: true, menuId }));

        this.repository.getAll(menuId).subscribe((categories) => {
            setTimeout(() => {
                this.state.update((current)  => ({...current, categories, loading: false }));
            }, 1000);
        })
    }
}