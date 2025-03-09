import { Component, computed } from "@angular/core";
import FeedStockPageService from "./feed-stock.service";
import SaveFeedStockModal from "./modals/save-feed-stock-modal";
import FeedStocksDisplay from "./display/feed-stocks-display";
import Paginator from "../../../components/paginator/paginator";
import DialogToggler from "../../../components/dialog/dialog-toggler";
import { Loader } from "../../../components/loader/loader";

@Component({
    selector: `app-ingredients-page`,
    template: `
    <div class="p-6 flex flex-col gap-4">
        <app-save-feed-stock-modal dialogId="save-feed-stock-modal-id"/>
        
        @if (state().loading) {
            <app-loader color="secondary"/>
        }
        @if (state().data) {
            <div class="flex flex-col gap-8 p-4">
                <div class="flex">
                    <div class="flex-1">
                        <div class="flex border p-3 rounded-lg border-slate-300 gap-2 w-[300px]">
                            <img width="24" height="24" src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="text" name="search" id="search" class="outline-none" placeholder="Buscar Categoria... ">
                        </div>
                    </div>
                    <app-dialog-toggler dialogId="save-feed-stock-modal-id">
                        <div class="btn ">Crear Ingrediente</div>
                    </app-dialog-toggler>
                </div>
                
                @if (state().data!.data.length !== 0) {
                    <app-feed-stocks-display [feedStocks]="state().data!.data"/>
                    <div class="self-center">
                        <app-paginator 
                            (pageChangeEvent)="pageChangeHandler($event)" 
                            [dataSize]="state().data!.meta.dataSize" 
                            [pageSize]="state().data!.meta.pageSize" 
                            [defaultPage]="state().data!.meta.page" 
                        />
                    </div>
                }
                @if(state().data!.data.length === 0 && !state().loading) {
                    <p class="text-slate-600">No hay ingredientes creados...</p>
                }
            </div>
        }
    </div>
    `,
    imports: [SaveFeedStockModal, FeedStocksDisplay, Paginator, DialogToggler, Loader]
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