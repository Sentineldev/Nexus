import { Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProduct from "../../core/classes/category-product.class";
import DecimalsUtils from "../../utils/decimals";
import RestaurantPageService2 from "../restaurant/restaurant-page.service";


export type OrderClient = {
    name: string;
    identification: string;
    identificationType: string;
};
export type OrderProductState = {
    quantity: number;
    total: number;
    product: CategoryProduct;
};

type ServiceState = {
    products: OrderProductState[];
    total: number;
    client: OrderClient;
    isClientSet: boolean;
    type: string;
    location: string;
    readyToProcess: boolean;
};

@Injectable({
    providedIn: 'root'
})
export default class OrderService {


    private state: WritableSignal<ServiceState>

    constructor(
        private readonly restaurantPageService: RestaurantPageService2,
    ) {

        this.state = signal<ServiceState>({
            products: [],
            total: 0,   
            client: {
                identification: "29660012",
                identificationType: "V",
                name: "Jesus Antonio Figuera Yaguare",
            },
            isClientSet: true,
            type: "RESTAURANT",
            location: this.restaurantPageService.getRestaurant().name,
            readyToProcess: true,
        });
    }



    reset() {
        this.state.set({
            client: {
                identification: "",
                identificationType: "",
                name: "",
            },
            isClientSet: false,
            location: "",
            products: [],
            readyToProcess: false,
            total: 0,
            type: "RESTAURANT"
        });
    }
    isRoomService() {
        return this.state().type === "ROOM_SERVICE";
    }

    isInRestaurant() {
        return this.state().type === "RESTAURANT";
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


    updateStatus() {

        const state = this.state();

        if (!state.isClientSet) {
            return ;
        }

        if (state.products.length === 0) {
            return;
        }

        if (state.location.length === 0) {
            return;
        }

        this.state.update((current) => ({...current, readyToProcess: true }));
    }

    setRoom(room: string) {
        this.state.update((current) => ({
            ...current,
            location: room,
            type: "ROOM_SERVICE"
        }));
        this.updateStatus();
    }

    setClient(body: OrderClient) {
        this.state.update((current) => ({...current, client:body, isClientSet: true}));
        this.updateStatus();
    }

    modifyProduct(product: OrderProductState) {
        
        if (product.quantity === 0) {
            this.removeProduct(product.product);
            return;
        }

        this.state.update((current) => {

            const productIndex = current.products.findIndex((val) => val.product.id === product.product.id);

            if (productIndex !== -1) {

                const newProductTotal = DecimalsUtils.ROUND_TO_2_DECIMALS(product.quantity * product.product.price); 
                current.products[productIndex] = {
                    ...product,
                    quantity: product.quantity,
                    total: newProductTotal
                };
                
            }
            return {...current,};
        });

        this.updateTotal();
        this.updateStatus();
    }

    removeProduct(product: CategoryProduct) {

        this.state.update((current) => {
            current.products = current.products.filter((val) => val.product.id !== product.id);
            return {...current};
        });

        this.updateTotal();
        this.updateStatus();
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
        this.updateStatus();
    }

    private updateTotal() {


        this.state.update((current) => {
            current.total = current.products.reduce((a,b) => DecimalsUtils.ROUND_TO_2_DECIMALS(a + b.total) ,0);

            return {...current};
        });
    }
}