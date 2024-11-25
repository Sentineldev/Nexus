import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: 'app-restaurant-home',
    imports: [],
    templateUrl: `./restaurant-home.html`
})
export default class RestaurantHome {   





    constructor(
        private readonly route: ActivatedRoute
    ) {

        console.log(route.snapshot.data)
    }
}
  