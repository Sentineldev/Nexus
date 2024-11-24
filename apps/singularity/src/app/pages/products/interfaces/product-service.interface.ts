import { PageData, PageFilter } from "../../../shared/types/pagination";
import Product from "../classes/product.class";


export type SaveProduct = {
    name: string;
    description: string;
};

export default interface ProductService {
    save(product: SaveProduct): Promise<void>
    update(id: string, product: SaveProduct): Promise<void>
    delete(id: string): Promise<void>
    getPage(filter: PageFilter<{}>): Promise<PageData<Product>>

}