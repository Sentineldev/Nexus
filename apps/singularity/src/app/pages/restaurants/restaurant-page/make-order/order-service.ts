import { Injectable, signal, WritableSignal } from "@angular/core";
import CategoryProduct from "../../classes/category-product.class";


export type SaveOrderProduct = {
    quantity: number;
    total: number;
    product: CategoryProduct;
};

type ServiceState = {
    products: SaveOrderProduct[];
    total: number;
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
        });
    }



    getOrderProducts() {
        return this.state().products;
    }

    getTotal() {
        return this.state().total;
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
            current.total = current.products.reduce((a,b) => a + b.total ,0)

            return {...current,};
        });
    }

    removeProduct(product: CategoryProduct) {

        this.state.update((current) => {
            current.products = current.products.filter((val) => val.product.id !== product.id);
            current.total = current.products.reduce((a,b) => a + b.total ,0)
            return {...current};
        } )
    }

    addProduct(product: CategoryProduct) {

        this.state.update((current) => {

            const productIndex = current.products.findIndex((val) => val.product.id === product.id);

            if (productIndex !== -1) {
                current.products[productIndex].quantity+=1;
                current.products[productIndex].total+=product.price;
            }
            if (productIndex === -1) {
                current.products.push({
                    product,
                    quantity: 1,
                    total: product.price,
                });
            }
            current.total = current.products.reduce((a,b) => a + b.total ,0)
            return {...current};
        });
    }
}