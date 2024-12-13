import { Component, computed, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import RestaurantPageService from "./restaurant-page.service";
import { ErrorAlert } from "../../../shared/alerts/error-alert";
import LoadingScreen from "../../../shared/loader/loading-screen";
import RestaurantTopHero from "./components/restaurant-top-hero";
@Component({
    selector: 'app-restaurant-page',
    imports: [RouterOutlet, ErrorAlert, LoadingScreen, RestaurantTopHero],
    template: `
    <div class="w-full overflow-auto">
        @if (!state().loading && state().errorMessage.length === 0) {
            <app-restaurant-top-hero [restaurant]="state().restaurant"/>
            <router-outlet/>
        }
        @if (!state().loading && state().errorMessage.length !== 0) {
            <app-error-alert [message]="state().errorMessage"/>
        }
        @if (state().loading) {
            <app-loading-screen label="Cargando restaurante..."/>
    }
    </div>
    `,
})
export default class RestaurantPage implements OnInit {


    public state = computed(() => this.service.getState());


    constructor(
        private readonly service: RestaurantPageService,
        private readonly route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
        if (!restaurantId) return;


        this.service.getById(restaurantId);
    }

}
  