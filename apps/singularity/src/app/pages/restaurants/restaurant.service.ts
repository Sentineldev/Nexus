import { Inject, Injectable, signal, WritableSignal } from "@angular/core"
import { take } from "rxjs";
import { PageFilter, PageData } from "../../shared/types/pagination";
import Restaurant from "./classes/restaurant.class";
import { SaveRestaurant } from "./dto/restaurant.dto";
import RestaurantRepository from "./interfaces/restaurant-repository.interface";
import LocalRestaurantRepository from "./repositories/restaurant.repository";

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

    getById(id: string) {
        return this.repository.getById(id);
    }
   
    getPage(filter: PageFilter<{}>) {
        this.state.update((val) => ({...val, loadingPage: true }));


        this.repository.getPage(filter).pipe(take(1)).subscribe((val) => {

            this.state.update((current) => ({ ...current, loadingPage: false, page: val, filter: filter  }))
        })
    }


}