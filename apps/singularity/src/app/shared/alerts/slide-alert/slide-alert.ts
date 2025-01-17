import { Component, input } from "@angular/core";

@Component({
    selector: `app-slide-alert`,
    styleUrl: `./slide-alert.css`,
    template: `
    <div class="flex gap-2 items-center shadow bg-white h-20 w-80 rounded-lg absolute bottom-0 transition-all duration-500">
        <div class="w-[24px] h-full bg-orange-300 rounded-l-lg"></div>
        <div class="flex flex-col flex-1 p-3">
            <h1 class="font-bold">Alerta</h1>
            <p class="text-slate-700">{{message()}}</p>
        </div>
    </div>
    `,
})
export default class SlideAlert {

    public message = input.required<string>();


}