import { Component, input } from "@angular/core";
import { Loader } from "./loader";

@Component({
    selector: `app-loading-screen`,
    template: `
    
        <div class="absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] h-screen w-full flex items-center justify-center">
            <div class="flex flex-col gap-4 items-center">
                <app-loader/>
                <h1 class="text-white text-[2rem] font-sans font-bols"> {{label()}} </h1>
            </div>
        </div>
    `,
    imports: [Loader]
})
export default class LoadingScreen {

    public label = input.required<string>();
}