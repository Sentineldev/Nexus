import { Component, computed } from "@angular/core";
import FeedStockPageService from "./feed-stock.service";
import SaveFeedStockModal from "./modals/save-feed-stock-modal";
import DialogToggler from "../../shared/dialog/dialog-toggler";
import FeedStockDisplay from "./display/feed-stock-display";
import FeedStocksDisplay from "./display/feed-stocks-display";
import Paginator from "../../shared/paginator/paginator";
import { Loader } from "../../shared/loader/loader";
import LoadingScreen from "../../shared/loader/loading-screen";

@Component({
    selector: `app-ingredients-page`,
    template: `
    <div class="p-6 flex flex-col gap-4">
        <app-save-feed-stock-modal dialogId="save-feed-stock-modal-id"/>
        <app-dialog-toggler dialogId="save-feed-stock-modal-id">
            <div class="p-3 bg-slate-700 text-white rounded-lg">Registrar Ingrediente</div>
        </app-dialog-toggler>
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        @if (state().data) {
            <div class="flex flex-col gap-4 p-1">
                <app-feed-stocks-display [feedStocks]="state().data!.data"/>
                @if (state().data!.data.length !== 0) {
                    <div class="self-center">
                        <app-paginator 
                            (pageChangeEvent)="pageChangeHandler($event)" 
                            [dataSize]="state().data!.meta.dataSize" 
                            [pageSize]="state().data!.meta.pageSize" 
                            [defaultPage]="state().data!.meta.page" 
                        />
                    </div>
                }
            </div>
        }
    </div>
    `,
    imports: [SaveFeedStockModal, DialogToggler, FeedStocksDisplay, Paginator, Loader]
})
export default class FeedStockPage {





    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: FeedStockPageService
    ) {}

    pageChangeHandler(page: number) {
        if (!this.state().loading) {
            this.service.getPage({ ...this.state().filter, page });
        }
    }

}