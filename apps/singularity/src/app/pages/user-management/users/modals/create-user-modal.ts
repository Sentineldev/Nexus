import { Component, computed, input, signal } from "@angular/core";

import CustomDialog from "../../../../components/dialog/custom-dialog";
import CreateUserWithSearch from "./assign-user-form";
import CreateUserForm from "./create-user-form";

@Component({
    selector: `app-create-user-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white m-auto lg:w-[600px] rounded-xl flex flex-col gap-4">
            <div>
                <button (click)="onTabClickHandler(1)" type="button" [className]="tab() === 1 ? 'p-3 border-b-primary border-b-2' : 'p-4'">Asignar Usuario</button>
                <button (click)="onTabClickHandler(2)" type="button" [className]="tab() === 2 ? 'p-3 border-b-primary border-b-2' : 'p-4'">Crear Usuario</button>
            </div>
            <div class="p-6 pt-0 flex flex-col gap-3">
                <h1 class="text-center font-sans text-xl font-medium text-primary">{{modalTitle()}}</h1>
                @if (tab() === 1) {
                    <app-assign-user-form/>
                }
                @if (tab() === 2) {
                    <app-create-user-form/>
                }
            </div>
        </div>
    </app-custom-dialog>
   
    `,
    imports: [CustomDialog, CreateUserWithSearch, CreateUserForm]
})
export default class CreateUserModal {

    public dialogId = input.required<string>();

    public tab = signal<number>(1);

    public modalTitle = computed(() => this.tab() === 1 ? "Asignar Usuario" : "Crear Usuario");


    onTabClickHandler(tab: number) {
        this.tab.set(tab);
    }
}