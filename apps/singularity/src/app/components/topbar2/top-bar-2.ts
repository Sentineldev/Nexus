import { Component, input } from "@angular/core";

@Component({
    selector: `app-topbar`,
    template: `
    <div class="border-b p-4 py-2 bg-white">
        <h1 class="font-bold text-black text-3xl p-3">{{label()}}</h1>
    </div>
    `,
})
export default class TopBar2 {

    public label = input.required<string>();
}