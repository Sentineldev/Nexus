import { Component } from "@angular/core";

@Component({
    selector: `app-dropdown-menu`,
    template: `
    <div>
        <button id="open-menu-id" class="open-menu-id">Abrir Menu</button>
        <div class="dropdown hidden bg-slate-700 w-[150px]">
           <ng-content></ng-content>
        </div>
    </div>
    `,
    styleUrl: `./drop-down-menu.css`
})
export default class DropDownMenu {




}