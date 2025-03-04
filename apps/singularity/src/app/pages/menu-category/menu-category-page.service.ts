import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import MenuCategoryRepository from "../restaurants/interfaces/menu-category-repository.interface";
import ApiMenuCategoryRepository from "../../shared/repositories/api/menu-category-api.repository";
import MenuCategory from "../restaurants/classes/menu-category.class";


type ServiceState = {
    loading: boolean;
    category: MenuCategory | undefined;
    hasError: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class MenuCategoryPageService2 {



    private state: WritableSignal<ServiceState>;

    constructor(
        @Inject(ApiMenuCategoryRepository)
        private readonly repository: MenuCategoryRepository
    ) {
        this.state = signal<ServiceState>({
            category: undefined,
            loading: false,
            hasError: false,
        });
    }


    getState() {
        return this.state();
    }
    getCategory() {
        const category = this.state().category;

        if (!category) {
            throw new Error();
        }
        return category;
    }

    loadCategory(categoryId: string) {

        this.state.update((current) => ({ ...current, loading: true }));

        this.repository.getById(categoryId).subscribe((category) => {
            setTimeout(() => {
                if (category) {
                    this.state.update((current) => ({ ...current, loading: false, hasError: false, category: category }));
                    return;
                } 
                this.state.update((current) => ({ ...current, loading: false, hasError: true, }));
            }, 1000);
        })
    }
} 