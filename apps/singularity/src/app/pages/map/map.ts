import { Component, HostListener, signal } from "@angular/core";

@Component({
    selector: `app-map-selector`,
    template: `
        <div class="flex items-center justify-center">
            <div class="w-[720px] h-[720px] bg-red-300">
                <div class="h-32 w-32 bg-red-400">
                    <h1>hola</h1>
                </div>
            </div>
        </div>
    `
})

export default class MapSelectorPage {

    @HostListener('document:mousemove',["$event"])
    onMouseMoveHandler() {

        console.log("e");
    }
}