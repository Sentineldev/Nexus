import { Injectable, signal, WritableSignal } from "@angular/core";
import User from "../../pages/users/user.class";


type ServiceState = {
    logIn: boolean;
    user: User | undefined;
};

@Injectable({
    providedIn: "root"
})
export default class AuthService {


    private state: WritableSignal<ServiceState>;


    constructor() {



        this.state = signal({
            logIn: false,
            user: undefined
        });
    }

    getState() {
        return this.state();
    }

    isLogIn() {
        return this.state().logIn;

    }
    logIn(user: User) {

        this.state.update((current) => ({...current, user, logIn: true }));
    }

}