import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import MenuCategoryRepository from "../../restaurants/interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../../shared/repositories/api/menu-category-api.repository";
import MenuCategory from "../../restaurants/classes/menu-category.class";
import MenuPageService2 from "../menu-page.service";


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
        private readonly service: MenuPageService2,
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {


        const menuId = this.service.getMenu().id;
        this.state = signal<ServiceState>({
            categories: [],
            loading: false,
            menuId,
        });
        this.getCategories();
    }


    getState() {
        return this.state();
    }

    getCategories() {


        this.state.update((current) => ({ ...current, loading: true }));

        this.repository.getAll(this.state().menuId).subscribe((categories) => {
            setTimeout(() => {
                this.state.update((current)  => ({...current, categories, loading: false}));
            }, 1000);
        })
    }
}