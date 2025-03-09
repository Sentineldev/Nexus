import { Observable } from "rxjs";
import Client from "../classes/client.class";
import { PageData, PageFilter } from "../types/pagination";
import { Result } from "../types/result";

export type SaveClient = {
    identification: string;
    identificationType: string;
    email: string;
    fullName: string;
};



export default interface ClientRepository {


    save(body: SaveClient): Observable<string>
    update(id: string, body: SaveClient): Observable<string>
    delete(id: string): Observable<string>
    getByIdentification(identification: string): Observable<Result<Client>>
    getPage(filter: PageFilter<any>): Observable<PageData<Client>>
}