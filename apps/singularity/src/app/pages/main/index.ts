import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import AuthService from "./auth.service";

@Component({
    selector: `app-index`,
    template: `
        <router-outlet/>
    `,
    imports: [RouterOutlet]
})
export default class AppIndex implements OnInit {

    constructor(
        private readonly service: AuthService,
    ) {}
    ngOnInit(): void {
        this.service.logIn();
    }
}