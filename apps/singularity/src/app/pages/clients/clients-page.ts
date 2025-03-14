import { Component, computed, OnInit, signal } from "@angular/core"
import Paginator from "../../components/paginator/paginator";
import ClientsService from "./client.service";
import ClientsDisplay from "./components/clients-display";
import SaveClientModal from "./modals/save-client-modal";
import { Loader } from "../../components/loader/loader";
import DialogToggler from "../../components/dialog/dialog-toggler";
import TopBar2 from "../../components/topbar2/top-bar-2";


@Component({
    selector: `app-clients-page`,
    template: `
    <app-topbar label="Clientes"/>
    <app-save-client-modal [dialogId]="dialogId()" />
    <div class="p-12 flex flex-col gap-6">
        @if(state().loading) {
            <app-loader color="secondary"/>
        }
        <div class="flex flex-col gap-4">
            <div class="flex flex-col lg:flex-row gap-8 lg:gap-8">
                <div class="flex-1">
                        <div class="search-bar">
                            <img src="/svg/search-svgrepo-com.svg" alt="">
                            <input type="search" name="search" id="search" placeholder="Buscar Cliente... ">
                        </div>
                    </div>
                <app-dialog-toggler [dialogId]="dialogId()">
                    <div class="btn">
                        Registrar cliente
                    </div>
                </app-dialog-toggler>
            </div>
            @if ( state().page && state().page!.data.length !== 0) {
                <app-clients-display [clients]="state().page!.data"/>
                <div class="self-center">
                    <app-paginator 
                    (pageChangeEvent)="pageChangeHandler($event)" 
                    [dataSize]="state().page!.meta.dataSize" 
                    [pageSize]="state().page!.meta.pageSize" 
                    [defaultPage]="state().page!.meta.page" 
                    />
                </div>
            }
            @if(state().page && state().page!.data.length === 0 && !state().loading) {
                <p class="text-slate-600">No hay clientes registrados...</p>
            }
        </div>
    </div>
    `,
    imports: [SaveClientModal, ClientsDisplay, Paginator, Loader, DialogToggler, TopBar2]
})
export default class ClientsPage implements OnInit{


    public dialogId = signal<string>("save-client-dialog");
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
