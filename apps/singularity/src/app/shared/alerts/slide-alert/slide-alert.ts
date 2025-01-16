import { Component, input } from "@angular/core";

@Component({
    selector: `app-slide-alert`,
    styleUrl: `./slide-alert.css`,
    template: `
    <div class="slide-alert  transition-all duration-500 p-3 absolute bottom-0">
        <h1 class="text-white">{{message()}}</h1>
    </div>
    `,
})
export default class SlideAlert {

    public message = input.required<string>();


}