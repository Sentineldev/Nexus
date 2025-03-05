import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: `app-index`,
    templateUrl: './index-page.html',
    imports: [RouterOutlet, RouterLinkActive, RouterLink]
})
export default class AppIndex {


}