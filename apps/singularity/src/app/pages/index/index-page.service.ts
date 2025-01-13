import { Injectable, signal, WritableSignal } from "@angular/core";


type ServiceState = {
    excludeTopBar: boolean;
};

@Injectable({
    providedIn: "root"
})
export default class IndexPageService {


    private state: WritableSignal<ServiceState>
    

    constructor() {

        this.state = signal<ServiceState>({
            excludeTopBar: false,
        });
    }



    getState() {
        return this.state();
    }

    removeTopBar() {

        this.state.update((current) => ({...current, excludeTopBar: true }));
    }
}