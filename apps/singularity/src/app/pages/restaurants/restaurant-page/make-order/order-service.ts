import { Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProduct from "../../classes/category-product.class";
import DecimalsUtils from "../../../../utils/decimals";


export type OrderClient = {
    name: string;
    identification: string;
    identificationType: string;
};
export type SaveOrderProduct = {
    quantity: number;
    total: number;
    product: CategoryProduct;
};

type ServiceState = {
    products: SaveOrderProduct[];
    total: number;
    client: OrderClient;
    isClientSet: boolean;
};

@Injectable({
    providedIn: 'root'
})
export default class OrderService {


    private state: WritableSignal<ServiceState>

    constructor() {

        this.state = signal<ServiceState>({
            products: [],
            total: 0,   
            client: {
                identification: "",
                identificationType: "",
                name: "",
            },
            isClientSet: false,
        });
    }



    getOrderProducts() {
        return this.state().products;
    }

    getTotal() {
        return this.state().total;
    }

    getState() {
        return this.state();
    }


    setClient(body: OrderClient) {
        this.state.update((current) => ({...current, client:body, isClientSet: true}));
    }

    modifyProduct(product: SaveOrderProduct) {
        
        if (product.quantity === 0) {
            this.removeProduct(product.product);
            return;
        }

        this.state.update((current) => {

            const productIndex = current.products.findIndex((val) => val.product.id === product.product.id);

            if (productIndex !== -1) {

                const newProductTotal = product.quantity * product.product.price; 
                current.products[productIndex] = {
                    ...product,
                    quantity: product.quantity,
                    total: newProductTotal
                };
                
            }
            return {...current,};
        });

        this.updateTotal();
    }

    removeProduct(product: CategoryProduct) {

        this.state.update((current) => {
            current.products = current.products.filter((val) => val.product.id !== product.id);
            return {...current};
        });

        this.updateTotal();
    }

    addProduct(product: CategoryProduct) {

        this.state.update((current) => {

            const productIndex = current.products.findIndex((val) => val.product.id === product.id);

            if (productIndex !== -1) {
                current.products[productIndex].quantity+=1;
                current.products[productIndex].total = DecimalsUtils.ROUND_TO_2_DECIMALS(current.products[productIndex].total + product.price);
            }
            if (productIndex === -1) {
                current.products.push({
                    product,
                    quantity: 1,
                    total: product.price,
                });
            }
            return {...current};
        });
        this.updateTotal();
    }

    private updateTotal() {


        this.state.update((current) => {
            current.total = current.products.reduce((a,b) => DecimalsUtils.ROUND_TO_2_DECIMALS(a + b.total) ,0);

            return {...current};
        });
    }
}