import { Component } from "@angular/core";
import OrdersPageService from "./orders-page.service";

@Component({
    selector: `app-orders-page`,
    imports: [],
    template: ``
})
export default class OrdersPage {



    constructor(
        private readonly service: OrdersPageService
    ) {}
}