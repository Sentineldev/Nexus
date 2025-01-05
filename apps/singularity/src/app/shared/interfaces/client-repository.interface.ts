import { Observable } from "rxjs";
import Client from "../../pages/clients/classes/client.class";
import { SaveClient } from "../../pages/clients/dto/client.dto";
import { PageData, PageFilter } from "../types/pagination";
import { Result } from "../types/result";

export default interface ClientRepository {


    Save(body: SaveClient): Observable<string>
    Update(id: string, body: SaveClient): Observable<string>
    Delete(id: string): Observable<string>
    GetByIdentification(identification: string): Observable<Result<Client>>
    GetPage(filter: PageFilter<any>): Observable<PageData<Client>>
}