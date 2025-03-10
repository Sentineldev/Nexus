import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import AuthService from "../../core/services/auth.service";

@Component({
    selector: `app-top-bar`,
    templateUrl: `./topbar.html`,
    styleUrl: `./topbar.css`,
    imports: [RouterLink]
})
export default class Topbar {


    constructor(
        private readonly authService: AuthService
      ) {}
    
      onClickHandler() {
        this.authService.logOut();
    
        window.location.reload();
      }
}