import { Injectable, signal, WritableSignal } from "@angular/core";
import { PageFilter } from "../../../../shared/types/pagination";


type ServiceState = {};
@Injectable({
    providedIn: "root"
})
export default class OrdersPageService {


    private state: WritableSignal<ServiceState>;


    constructor() {

        this.state = signal<ServiceState>({});
    }

    getState() {
        return this.state();
    }


    refreshPage() {}

    getPage(filter: PageFilter<{}>) {}
}