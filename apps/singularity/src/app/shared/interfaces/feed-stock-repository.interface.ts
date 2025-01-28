import { Observable } from "rxjs";
import { PageData, PageFilter } from "../types/pagination";
import FeedStock from "../../pages/feed-stock/classes/feed-stock.class";
import { SaveFeedStockDto } from "./types/feed-stock.type";

export default interface FeedStockRepository {


    save(body: SaveFeedStockDto): Observable<string>
    update(id: string, body: SaveFeedStockDto): Observable<string>
    delete(id: string): Observable<string>
    getPage(filter: PageFilter<unknown>): Observable<PageData<FeedStock>>
}