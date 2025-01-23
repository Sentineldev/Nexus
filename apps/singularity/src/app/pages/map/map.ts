import { Component, HostListener, signal } from "@angular/core";

@Component({
    selector: `app-map-selector`,
    template: `
        <div class="flex items-center justify-center">
            <div class="w-[720px] h-[500px] bg-red-300 relative">
                <div data-isDraggable="true" class="h-32 w-64 bg-red-400 absolute m-0 p-0">
                    <div data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                </div>
            </div>
        </div>
    `
})

export default class MapSelectorPage {

    public selectedTarget = signal<{ dom: HTMLElement,  x: number, y: number } | undefined>(undefined);
    public cursor = signal<{x: number, y: number} | undefined>(undefined);

    @HostListener('document:mousemove',["$event"])
    onMouseMoveHandler(event: MouseEvent) {

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const target = this.selectedTarget();
        const cursor = this.cursor();
        if (target && cursor) {
            const distanceX = mouseX - cursor.x;
            const distanceY = mouseY - cursor.y; 

            const parentRect = (target.dom.parentNode as HTMLDivElement).getBoundingClientRect();

            const targetRect = target.dom.getBoundingClientRect();
            

            const realX = (targetRect.x - parentRect.x) + target.dom.offsetWidth;
            const realY = (targetRect.y - parentRect.y) + target.dom.offsetHeight;

            
            if ((realY >= parentRect.height) && distanceY > 0) {

                const difference = realY - parentRect.height;

                console.log(difference)
                console.log(distanceY);
                console.log(target.dom.style.top);
                return;
            }   
            if (((realY - target.dom.offsetHeight) <= 0) && distanceY < 0) {
                return;
            }

            if ((realX >= parentRect.width) && distanceX > 0) {
                return;
            }   
            if (((realX - target.dom.offsetWidth) <= 0) && distanceX < 0) {
                return;
            }



            target.dom.style.left = ((target.x) + distanceX) + 'px';
            target.dom.style.top = ((target.y) + distanceY) + 'px';
            target.dom.style.cursor = "grab";
        }

    }

    @HostListener('document:mouseup',["$event"])
    onMouseUpHandler() {
        
        const target = this.selectedTarget();

        if (target) {
            target.dom.style.cursor = "auto";
        }
        this.selectedTarget.set(undefined);
    }

    @HostListener('document:mousedown',["$event"])
    onMouseDownHandler(event: MouseEvent) {



        const x = event.clientX;
        const y = event.clientY;


        const target = event.target as HTMLDivElement;


       


        if (!(target.dataset['isdraggable'] === "true")) {
            return;
        }

        // const targetX = target.getBoundingClientRect().left;
        // const targetY = target.getBoundingClientRect().top;

        const targetX = Number(target.style.left.split("px")[0]) || 0;
        const targetY = Number(target.style.top.split("px")[0]) || 0;


      

        this.cursor.set({ x, y });
        this.selectedTarget.set({
            dom: target,
            x: targetX,
            y: targetY,
        });
    }
}