import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: `app-go-back-link`,
    template: `
    <a [routerLink]="link()" class="flex items-center gap-2 hover:bg-slate-300 transition-all rounded-lg w-fit p-2">
        <img width="24" height="24" src="/arrow-back-outline-svgrepo-com.svg" alt="arrow back">
        <span class="font-sans text-[1rem]">{{label()}}</span>
    </a>
    `,
    imports: [RouterLink]
})
export default class GoBackLink {


    public link = input.required<string>();
    public label = input<string>("Volver");
}