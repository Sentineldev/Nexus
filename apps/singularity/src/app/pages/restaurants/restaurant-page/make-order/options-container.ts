import { Component } from "@angular/core";
import DialogToggler from "../../../../shared/dialog/dialog-toggler";
import SetClientModal from "./modals/set-client-modal";

@Component({
    selector: `app-options-container`,
    template: `
    <app-set-client-modal/>
    <div class="flex flex-col gap-4 h-full">
        
        <app-dialog-toggler dialogId="save-client-modal">
            <button class="h-24 w-24 bg-white text-sm text-black rounded-xl">Cliente</button>
        </app-dialog-toggler>
        <button class="h-24 w-24 bg-white text-sm text-black rounded-xl">Seleccionar Mesa</button>
        <div class="flex-1 flex items-end">
            <button class="h-24  w-24 bg-white text-sm text-black rounded-xl">Procesar</button>
        </div>
    </div>
    `,
    imports: [DialogToggler, SetClientModal]
})
export default class OptionsContainer {}