import { Inject, Injectable, signal, WritableSignal } from "@angular/core"
import { PageData, PageFilter } from "../../../shared/types/pagination"
import Restaurant from "../classes/restaurant.class";
import { SaveRestaurant } from "../dto/restaurant.dto";
import LocalRestaurantRepository from "../restaurant/restaurant.repository";
import RestaurantRepository from "../interfaces/restaurant-repository.interface";
import { filter, take } from "rxjs";

type RestaurantServiceProps = {
    filter: PageFilter<{}>
    page: PageData<Restaurant>
    loadingPage: boolean;
    loading: boolean;
}

@Injectable({
    providedIn: "root",
})
export default class RestaurantService {


    private state: WritableSignal<RestaurantServiceProps>;


    constructor(
        @Inject(LocalRestaurantRepository)
        private readonly repository: RestaurantRepository
    ) {
        this.state = signal<RestaurantServiceProps>({
            filter: {
                filter: {},
                page: 1,
                pageSize: 5,
            },
            page: {
                data: [],
                meta: {
                    dataSize: 0,
                    page: 1,
                    pageSize: 5,
                }
            },
            loading: false,
            loadingPage: false,
        });

        this.getPage(this.state().filter);
    } 

    getState() {
        return this.state();
    }
   
    save(body: SaveRestaurant) {
        this.state.update((val) => ({...val, loading: true}));
        this.repository.save(body)
        .pipe(take(1))
        .subscribe(() => {
            this.state.update((val) => ({...val, loading: false }));
            this.getPage(this.state().filter);
        });
        
    }


   
    getPage(filter: PageFilter<{}>) {
        this.state.update((val) => ({...val, loadingPage: true }));


        this.repository.getPage(filter).pipe(take(1)).subscribe((val) => {

            this.state.update((current) => ({ ...current, loadingPage: false, page: val, filter: filter  }))
        })
    }


}