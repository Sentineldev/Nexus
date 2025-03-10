import { Component, computed, OnInit } from "@angular/core";
import CategoriesPageService2 from "./categories-page.service";
import CategoriesDisplay from "./display/categories";
import { Loader } from "../../../components/loader/loader";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import MenuPageService2 from "../menu-page.service";
import CreateCategoryModal from "./create-category-modal";

@Component({
    selector: `app-categories-page2`,
    template: `
        <app-create-category-modal [dialogId]="dialogId()" [menu]="menu()"/>
        <div>
        @if (state().loading) {
            <div class="p-12">
            <app-loader color="secondary"/>
            </div>
        }
        @if (!state().loading) {
            
            <div class="w-full flex flex-col">
                <div class="flex p-8">
                    <div class="flex-1">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-[300px]">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="search" id="search" class="outline-none" placeholder="Buscar Categoria... ">
                        </div>
                    </div>
                    <div>
                        <app-dialog-toggler [dialogId]="dialogId()">
                            <div class="btn">Crear Categoria</div>
                        </app-dialog-toggler>
                    </div>
                </div>
                <app-categories-display [categories]="state().categories"/>
            </div>
        }
        </div>
    `,
    imports: [CategoriesDisplay, Loader, DialogToggler, CreateCategoryModal]
})
export default class CategoriesPage2 implements OnInit {



    public state = computed(() => this.service.getState());
    public menu = computed(() => this.menuPageService.getMenu());
    public dialogId = computed(() => `create-category-at-menu-${this.menu().id}`);
    constructor(
        private readonly menuPageService: MenuPageService2,
        private readonly service: CategoriesPageService2,
    ) {}
    ngOnInit(): void {
        this.service.getCategories(this.menu().id);
    }
}