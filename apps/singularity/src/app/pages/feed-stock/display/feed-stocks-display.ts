import { Component, input } from "@angular/core";
import FeedStock from "../classes/feed-stock.class";
import FeedStockDisplay from "./feed-stock-display";

@Component({
    selector: `app-feed-stocks-display`,
    template: `
    <div class="flex flex-col gap-4">
        @for (feedStock of feedStocks(); track feedStock.id; let isLast = $last) {
            <div [className]="!isLast && 'border-b py-2'">
                <app-feed-stock-display [feedStock]="feedStock" />
            </div>
        }
    </div>
    `,
    imports: [FeedStockDisplay]
})
export default class FeedStocksDisplay {

    public feedStocks = input.required<FeedStock[]>();
}