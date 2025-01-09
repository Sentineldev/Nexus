import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import ClientRepository from "../../shared/interfaces/client-repository.interface";
import ApiClientRepository from "../../shared/repositories/api-client-repository";
import { PageData, PageFilter } from "../../shared/types/pagination";
import Client from "./classes/client.class";


type ServiceState = {

    page: PageData<Client>
    filter: PageFilter<any>
    loading: boolean;
};
@Injectable({
    providedIn: "root"
})
export default class ClientsService {


    private state: WritableSignal<ServiceState>;
    constructor(
        @Inject(ApiClientRepository)
        private readonly repository: ClientRepository
    ) {

        this.state = signal({
            page: {
                data: [],
                meta: {
                    dataSize: 0,
                    page: 1,
                    pageSize: 5,
                },
            },
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            },
            loading: false,
        });
    }




    getState() {
        return this.state();
    }


    refreshPage() {

        const filter = this.state().filter;
        this.getPage(filter);
    }

    getPage(filter: PageFilter<any>) {

        this.state.update((current) => ({...current, loading: true }));

        this.repository.getPage(filter).subscribe((page) => {
            setTimeout(() => {
                this.state.update((current) => ({...current, loading: false, page, filter }))
            }, 1000);
        })


    }
}