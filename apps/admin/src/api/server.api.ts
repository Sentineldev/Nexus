import axios, { Axios } from "axios";
import { API_URL } from "../constants/api";

export default class ServerApi {
    private instance: Axios;
    constructor() {
        this.instance = axios.create({
            baseURL: `${API_URL}`,
        });
    }


    async handShake() {
        try {
            const response = await this.instance.get("/");
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response;
            }
            throw new Error()
        }
    }
}