import { Component, computed } from "@angular/core";
import ProductButton from "./product-button";
import MakeOrderPageService from "./make-order-page.service";

@Component({
    selector: `app-products-container`,
    styles: `
    .buttons-container {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(180px, auto));
        gap: 1.2rem;
        row-gap:2rem;
    }
    `,
    template: `
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 p-1">
            <label for="search" class="flex-1 flex items-center gap-2 border-b py-2 border-slate-300 cursor-text">
                <img src="/svg/search-svgrepo-com.svg" alt="search icon svg" width="24" height="24">
                <input (change)="inputChangeHandler($event)" class="outline-none w-full bg-transparent" type="search" name="search" id="search">
            </label>
            <label for="select-menu">
                <select (change)="selectChangeHandler($event)" class="hover:cursor-pointer outline-none p-3 bg-transparent" name="select-menu" id="select-menu">
                    <option value="">Seleccionar Menu</option>
                    @for (menu of state().menus; track $index) {
                        <option [value]="menu.id">{{ menu.name }}</option>
                    }
                </select>
            </label>
        </div>
        <div class="buttons-container justify-start">

            @for (product of state().products; track $index) {
                <app-product-button [product]="product"/>
            }   
        </div>
    </div>
    `,
    imports: [ProductButton]
})
export default class ProductsContainer {


    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: MakeOrderPageService
    ) {}


    inputChangeHandler(event: Event) {

        const target = event.target as HTMLSelectElement;

        const value = target.value;
        this.service.getProductsPage({
            ...this.state().filter,
            filter: {
                ...this.state().filter.filter,
                search: value,
            },
        });
    }
    selectChangeHandler(event: Event) {

        const target = event.target as HTMLSelectElement;

        const value = target.value;

        this.service.getProductsPage({
            ...this.state().filter,
            filter: {
                ...this.state().filter.filter,
                menuId: value,
            }
        });

    }
}