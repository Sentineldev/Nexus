import axios, { Axios } from "axios";
import { API_URL } from "../../constants/api";
import { ProductsPageFilter, SaveProductDto } from "./products.dto";

export default class ProductsApi {
    private instance: Axios;
    constructor() {
        this.instance = axios.create({
            baseURL: `${API_URL}/products`,
        });
    }

    async Save(body: SaveProductDto) {
        try {
            const response = await this.instance.post("/", body);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response;
            }
            throw new Error()
        }
    }


    async GetPage(params: ProductsPageFilter) {
        try {
            const response = await this.instance.get("/",{
                params
            });
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response;
            }
            throw new Error()
        }
    }
    
}