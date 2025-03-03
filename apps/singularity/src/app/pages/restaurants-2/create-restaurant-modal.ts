import { Component, input } from "@angular/core";
import CustomDialog from "../../shared/dialog/custom-dialog";

@Component({
    selector: `app-create-restaurant-modal`,
    template: `
    
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="w-[300px] h-[300px] bg-red-300 m-auto"></div>
    </app-custom-dialog>
    `,
    imports: [CustomDialog]
})
export default class CreateRestaurantModal {

    public dialogId = input.required<string>();

}