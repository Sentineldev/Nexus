import { Component, Inject, input, signal } from "@angular/core";
import FeedStockPageService from "../feed-stock.service";
import { ReactiveFormsModule } from "@angular/forms";
import FeedStock from "../classes/feed-stock.class";
import { Loader } from "../../../../components/loader/loader";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import FeedStockRepository from "../../../../core/interfaces/feed-stock-repository.interface";
import ApiFeedStockRepository from "../../../../core/api/api-feed-stock-repository";

@Component({
    selector: `app-delete-feed-stock-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="bg-white shadow-sm p-4 rounded-xl m-auto w-full lg:w-[380px]">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <h1 class="text-center text-[1.2rem] font-sans text-primary">Eliminar Ingrediente</h1>
                    @if (errorMessage().length > 0 || successMessage().length > 0) {
                        @if (errorMessage().length > 0) {
                            <app-error-alert [message]="errorMessage()"/>
                        }
                        @if (successMessage().length > 0) {
                            <app-success-alert [message]="successMessage()"/>
                        }
                    }
                </div>
                <div>
                    <form (submit)="onSubmitHandler($event)" class="flex flex-col gap-6">
                        <fieldset class="border rounded-sm p-3">
                            <legend>Ingrediente</legend>
                            <p>Nombre: <strong>{{feedStock().name}}</strong></p>
                            <p>Unidad: <strong>{{feedStock().unit}}</strong></p>
                        </fieldset>
                        <div>
                            <button [disabled]="loading()" class="btn w-full">
                                @if(loading()) {
                                    <app-loader/>
                                } @else {
                                    Modificar
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </app-custom-dialog>
    `,
    imports: [ReactiveFormsModule, Loader, SuccessAlert, CustomDialog, ErrorAlert]
})

export default class DeleteFeedStockModal {
    public dialogId  = input.required<string>();

    public feedStock = input.required<FeedStock>();

    public errorMessage = signal("");
    public successMessage = signal("");
    public loading = signal(false);



    constructor(
        private readonly service: FeedStockPageService,
        @Inject(ApiFeedStockRepository)
        private readonly repository: FeedStockRepository
    ) {}


    onSubmitHandler(event: SubmitEvent) {

        event.preventDefault();

        this.loading.set(true);
        this.repository.delete(this.feedStock().id).subscribe((result) => {
            setTimeout(() => {
                if (result.length === 0) {
                    this.successMessage.set("Eliminado correctamente");
                    this.service.refresh();
                    return;
                }
                this.loading.set(false);
                this.errorMessage.set(result);

            }, 1000);
        })
    }
}