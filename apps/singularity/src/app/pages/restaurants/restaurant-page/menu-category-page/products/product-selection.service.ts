import { Injectable, signal, WritableSignal } from "@angular/core";
import Product from "../../../../products/classes/product.class";


type ServiceState = {
    product: Product | undefined;
    dialogId: string;
    droped: boolean;
};

@Injectable({
    providedIn: 'root'
})
export default class ProductSelectionService {


    private state: WritableSignal<ServiceState>;

    constructor() {
        this.state = signal<ServiceState>({
            product: undefined,
            dialogId: "",
            droped: false,
        });
    }


    getState() {
        return this.state();
    }



    onDragStart(product: Product) {
        const dialogId = `save-product-dialog-${product.id}`;
        this.state.set({ product, dialogId, droped: false });
    }

    onDragEnd() {

        if (!this.state().droped) {
            this.state.set({ dialogId: ``, droped: false, product: undefined });
        }
    }

    onDrop() {
        if (this.state().product) {
            this.state.update((current) => ({ ...current, droped: true }));
        }
    }

}