import { Component, input } from "@angular/core";
import FeedStock from "../classes/feed-stock.class";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import UpdateFeedStockModal from "../modals/update-feed-stock-modal";
import DeleteFeedStockModal from "../modals/delete-feed-stock-modal";

@Component({
    selector: `app-feed-stock-display`,
    template: `
    <app-delete-feed-stock-modal [dialogId]="'delete-feed-stock-modal-unique-'+feedStock().id" [feedStock]="feedStock()"/>
    <app-update-feed-stock-modal [dialogId]="'update-feed-stock-modal-unique-'+feedStock().id" [feedStock]="feedStock()"/>
    <div class="grid grid-cols-3 items-center gap-3">
        <div>
            <h1 class="text-xl">{{feedStock().name}}</h1>
        </div>
        <div>
            <h1 class="text-xl">{{feedStock().unit}}</h1>
        </div>
        <div>
            <app-dialog-toggler [dialogId]="'update-feed-stock-modal-unique-'+feedStock().id">
                <div class="p-3 rounded-lg text-white">
                    <img src="./svg/edit-svgrepo-com.svg" width="32" height="32" alt="Edit icon">
                </div>
            </app-dialog-toggler>
            <app-dialog-toggler [dialogId]="'delete-feed-stock-modal-unique-'+feedStock().id">
                <div class="p-3 rounded-lg text-white">
                    <img src="./svg/trash-svgrepo-com.svg" width="32" height="32" alt="Edit icon">
                </div>
            </app-dialog-toggler>
        </div>
    </div>
    `,
    imports: [DialogToggler, UpdateFeedStockModal, DeleteFeedStockModal]
})
export default class FeedStockDisplay {

    public feedStock = input.required<FeedStock>();
}