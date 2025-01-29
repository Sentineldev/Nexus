import { Component, computed, input } from "@angular/core";
import FeedStock from "../classes/feed-stock.class";
import DialogToggler from "../../../shared/dialog/dialog-toggler";
import UpdateFeedStockModal from "../modals/update-feed-stock-modal";
import DeleteFeedStockModal from "../modals/delete-feed-stock-modal";

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
    <div class="relative">
        <div class="flex flex-col dropdown-toggler cursor-pointer">
            <h1 class="text-2xl text-slate-700">{{feedStock().name}}</h1>
            <p class="text-slate-600 text-lg">{{feedStock().unit}}</p>
        </div>
        <div class="dropdown absolute  bg-white shadow-lg border w-44 z-50">
            <ul class="w-full">
                <li>
                    <app-dialog-toggler [dialogId]="updateDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44  text-start font-sans text-sm">Actualizar</div>
                    </app-dialog-toggler>
                </li>
                <li>
                    <app-dialog-toggler [dialogId]="deleteDialogId()">
                        <div class="hover:bg-slate-200 p-3 w-44 text-start font-sans text-sm">Remover</div>
                    </app-dialog-toggler>
                    <!-- <button (click)="openModal('delete')" class="hover:bg-slate-200 p-3 text-start w-full font-sans text-sm">Remover</button> -->
                </li>
            </ul>
        </div>
    </div>
    `,
    imports: [DialogToggler, UpdateFeedStockModal, DeleteFeedStockModal]
})
export default class FeedStockDisplay {


    public feedStock = input.required<FeedStock>();
    public updateDialogId =  computed(() => `update-feed-stock-modal-unique-${this.feedStock().id}`);
    public deleteDialogId =  computed(() => `delete-feed-stock-modal-unique-${this.feedStock().id}`);
}