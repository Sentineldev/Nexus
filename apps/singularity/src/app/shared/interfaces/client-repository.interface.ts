import { Observable } from "rxjs";
import Client from "../../pages/clients/classes/client.class";
import { SaveClient } from "../../pages/clients/dto/client.dto";
import { PageData, PageFilter } from "../types/pagination";
import { Result } from "../types/result";

export default interface ClientRepository {


    save(body: SaveClient): Observable<string>
    update(id: string, body: SaveClient): Observable<string>
    delete(id: string): Observable<string>
    getByIdentification(identification: string): Observable<Result<Client>>
    getPage(filter: PageFilter<any>): Observable<PageData<Client>>
}