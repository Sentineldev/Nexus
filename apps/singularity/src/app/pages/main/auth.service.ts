import { Injectable, signal, WritableSignal } from "@angular/core";
import LocalStorageUtils from "../../utils/local-storage";
import JwtUtils from "../../utils/jwt";
import { JwtData } from "../../core/types/jwt";
import { jwtDecode } from "jwt-decode";


type ServiceState = {
    user: JwtData | undefined;
};
@Injectable({
    providedIn: "root"
})
export default class AuthService {
    

    private token: string;

    private state: WritableSignal<ServiceState>;

    constructor() {

        this.token = LocalStorageUtils.GetToken();
        this.state = signal<ServiceState>({
            user: undefined
        });
    }


    getUser() {

        const user = this.state().user;

        if (user) {
            return user;
        }

        throw new Error("User not found");
    }

    logOut() {

        LocalStorageUtils.DeleteToken();
        this.state.set({ user: undefined });
        window.location.href = "/"
    }
    logIn() {

        try {
            const tokenData: JwtData = jwtDecode(this.token);
    
    
            if (JwtUtils.IsJwtExpired(tokenData.exp)) {
                this.logOut();
                return;
            }
            
            this.state.update((current) => ({ ...current, user: tokenData }));

            setInterval(() => {
                if (JwtUtils.IsJwtExpired(tokenData.exp)) {
                    this.logOut();
                    return;
                }
            }, 1000);
        } catch (error) {
            LocalStorageUtils.DeleteToken();
        }
    }

}