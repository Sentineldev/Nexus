import { Injectable } from "@angular/core";
import ProductService, { SaveProduct } from "../interfaces/product-service.interface";
import { PageFilter, PageData } from "../../../shared/types/pagination";
import Product from "../classes/product.class";

@Injectable({
    providedIn: 'root',
})
export default class LocalProductService  implements ProductService {
    
    
    private products: Product[];
    constructor() {
        this.products = [];
    }



    private async getById(id: string): Promise<Product | undefined> {

        return this.products.find((val) => val.id === id);

    }

    private async getIndex(id: string): Promise<number> {
        return this.products.findIndex((val) => val.id === id);
    }
    async save(product: SaveProduct): Promise<void> {

        const id = new Date().getTime().toLocaleString();
        const newProduct = new Product(id, product.name, product.description)
        const exists = await this.getById(id);

        if (exists) {
            throw new Error("Product already exists");
        }
        this.products = [...this.products, newProduct];
    }
    async update(id: string, product: SaveProduct): Promise<void> {

        const index = await this.getIndex(id);
        if (index === -1) {
            throw new Error("Product doesnt exists");
        }

        this.products[index].name = product.name;
        this.products[index].description = product.description;
    }
    async delete(id: string): Promise<void> {
        this.products = this.products.filter((val) => val.id !== id);
    }
    async getPage(filter: PageFilter<{}>): Promise<PageData<Product>> {

        const start = (filter.page - 1) * filter.pageSize;
        const end = start + filter.pageSize;
        const data = this.products.slice(start, end)

        const dataSize = this.products.length;
        return {
            data: data,
            meta: {
                dataSize: dataSize,
                page: filter.page,
                pageSize: filter.pageSize,
            }
        }
    }
}