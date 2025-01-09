import { Component, computed, OnInit } from "@angular/core"
import Paginator from "../../shared/paginator/paginator";
import ClientsService from "./client.service";
import ClientsDisplay from "./components/clients-display";
import SaveClientModal from "./modals/save-client-modal";
import { Loader } from "../../shared/loader/loader";


@Component({
    selector: `app-clients-page`,
    template: `
    <div class="p-6 flex flex-col gap-6">
        <app-save-client-modal dialogId="save-client-modal" />
        @if(state().loading) {
            <app-loader color="secondary"/>
        }
        <div class="flex flex-col gap-4 p-1">
            <app-clients-display [clients]="state().page.data"/>
            @if (state().page.data.length !== 0) {
                <div class="self-center">
                    <app-paginator 
                    (pageChangeEvent)="pageChangeHandler($event)" 
                    [dataSize]="state().page.meta.dataSize" 
                    [pageSize]="state().page.meta.pageSize" 
                    [defaultPage]="state().page.meta.page" 
                    />
                </div>
            }
        </div>
    </div>
    `,
    imports: [SaveClientModal, ClientsDisplay, Paginator, Loader]
})
export default class ClientsPage implements OnInit{



    public state = computed(() => this.service.getState());

    constructor(
        private readonly service: ClientsService
    ) {}
    ngOnInit(): void {
        this.service.getPage(this.state().filter);
    }

    pageChangeHandler(page: number) {
        this.service.getPage({
          ...this.state().filter,
          page,
        });
      }
}
