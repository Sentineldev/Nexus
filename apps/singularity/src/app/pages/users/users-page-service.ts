import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import User from "./user.class";
import UserRepository from "../../shared/interfaces/user-repository";
import ApiUserRepository from "../../shared/repositories/api/api-user-repository";



type ServiceState = {
    loading: boolean;
    users: User[];
};
@Injectable({
    providedIn: "root"
})
export default class UsersPageService {


    private state: WritableSignal<ServiceState>;

    constructor(
        @Inject(ApiUserRepository)
        private readonly repository: UserRepository
    ) {

        this.state = signal({
            loading: false,
            users: []
        });
    }




    getState() {
        return this.state();
    }

    getUsers() {

        this.state.update((current) => ({...current, loading: true, users: [] }));
        this.repository.getAll().subscribe((result) => {
            this.state.update((current) => ({...current, users: result,  loading: false }));
        })
    }

}