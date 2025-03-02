import { Injectable, signal, WritableSignal } from "@angular/core";
import User from "../../pages/users/user.class";
import { JwtData } from "../types/jwt";
import { jwtDecode } from "jwt-decode";
import LocalStorageUtils from "../../utils/local-storage";
import JwtUtils from "../../utils/jwt";


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

    logOut() {
        LocalStorageUtils.DeleteToken();
        this.state.update((current) => ({...current, user: undefined, logIn: false }))
        window.location.replace("/");
    }

    logIn(token: string) {

        const data: JwtData = jwtDecode(token);

        if (!JwtUtils.IsJwtExpired(data.exp)) {
            LocalStorageUtils.DeleteToken();
        }

        this.state.update((current) => ({...current, user: data, logIn: true }));

        setInterval(() => {
            
            if (!JwtUtils.IsJwtExpired(data.exp)) {
                this.logOut();
            }
        }, 1000);
    }   

}