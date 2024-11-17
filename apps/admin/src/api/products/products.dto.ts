import { PageFilter } from "../common/page.dto";

export type IncomingProduct = {
    Id: string;
    Name: string;
}

export type SaveProductDto = {
    name: string;
}

export type ProductsPageFilter = PageFilter & {
    Name: string;
}