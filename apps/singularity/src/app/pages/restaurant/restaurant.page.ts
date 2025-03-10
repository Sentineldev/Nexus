import { Component, computed, OnInit } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import RestaurantPageService2 from "./restaurant-page.service";
import LoadingScreen from "../../components/loader/loading-screen";

@Component({
    selector: `app-restaurant-page-2`,
    template: `

    @if (state().loading) {
        <app-loading-screen label="Cargando restaurante..."/>
    }
    @if (!state().loading && !state().hasError) {
        <router-outlet/>
    }
    @if (!state().loading && state().hasError) {
        <p>Los datos no pudieron ser cargados...</p>
    }

    `,
    imports: [RouterOutlet, LoadingScreen]
})
export default class RestaurantPage2 implements OnInit {


    public state = computed(() => this.service.getState());
    public restaurant = computed(() => this.service.getRestaurant());

    constructor(
        private readonly route: ActivatedRoute,
        private readonly service: RestaurantPageService2
    ) {}
    ngOnInit(): void {

        const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
        if (!restaurantId) return;
    
        this.service.loadRestaurant(restaurantId);
    }

}