import { Component, computed, input } from "@angular/core";
import FeedStock from "../classes/feed-stock.class";
import UpdateFeedStockModal from "../modals/update-feed-stock-modal";
import DeleteFeedStockModal from "../modals/delete-feed-stock-modal";
import DialogToggler from "../../../../components/dialog/dialog-toggler";

@Component({
    selector: `app-feed-stock-display`,
    styles: `
        .dropdown {
            display: none;
        }
        .dropdown-toggler:hover + .dropdown {
            display: inherit;

        }
        .dropdown:hover ~ .dropdown-toggler {
            background-color: red;
        }
        .dropdown:hover {
            display: inherit;
        }
    `,
    template: `
    <app-delete-feed-stock-modal [dialogId]="'delete-feed-stock-modal-unique-'+feedStock().id" [feedStock]="feedStock()"/>
    <app-update-feed-stock-modal [dialogId]="'update-feed-stock-modal-unique-'+feedStock().id" [feedStock]="feedStock()"/>
    
    <div class="grid grid-cols-3 items-center">
        <div>
            <h1 class="text-lg">{{feedStock().name}}</h1>
        </div>
        <div>
            <p class=" text-lg">{{feedStock().unit}}</p>
        </div>
        <div class="flex gap-4">
            <app-dialog-toggler [dialogId]="updateDialogId()">
                <div class="w-fit btn">
                    <img src="/svg/edit-svgrepo-com.svg" width="24" height="24"/>
                </div>
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="deleteDialogId()">
                <div class="w-fit btn">
                    <img src="/svg/trash-svgrepo-com.svg" width="24" height="24"/>
                </div>
            </app-dialog-toggler>
        </div>
    </div>
    `,
    imports: [UpdateFeedStockModal, DeleteFeedStockModal, DialogToggler]
})
export default class FeedStockDisplay {


    public feedStock = input.required<FeedStock>();
    public updateDialogId =  computed(() => `update-feed-stock-modal-unique-${this.feedStock().id}`);
    public deleteDialogId =  computed(() => `delete-feed-stock-modal-unique-${this.feedStock().id}`);
}