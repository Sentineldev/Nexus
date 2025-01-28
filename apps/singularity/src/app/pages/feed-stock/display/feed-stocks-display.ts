import { Component, input } from "@angular/core";
import FeedStock from "../classes/feed-stock.class";
import FeedStockDisplay from "./feed-stock-display";

@Component({
    selector: `app-feed-stocks-display`,
    template: `
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-3 items-center gap-3">
            <div>
                <h1 class="text-2xl text-slate-600">Nombre</h1>
            </div>
            <div>
                <h1 class="text-2xl text-slate-600">Unidad</h1>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            @for (feedStock of feedStocks(); track feedStock.id) {
                <app-feed-stock-display [feedStock]="feedStock" />
            }
        </div>
    </div>
    `,
    imports: [FeedStockDisplay]
})
export default class FeedStocksDisplay {

    public feedStocks = input.required<FeedStock[]>();
}