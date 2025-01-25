import { Component, HostListener, OnInit, signal } from "@angular/core";
import DropDownMenu from "./drop-down-menu";

@Component({
    selector: `app-map-selector`,
    template: `
        <div class="flex items-center h-full justify-center p-2">
            <div id="main-container" class="w-full h-full rounded-lg bg-slate-100 border relative overflow-hidden">
                <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border absolute m-0 p-0">
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 absolute m-0 p-0"></div>    
                </div>
                <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border absolute m-0 p-0">
                    <div data-isDraggable="false" class="absolute top-[-30px]">
                        <app-dropdown-menu>
                            <h1>hola mundo</h1>
                        </app-dropdown-menu>
                    </div>
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 absolute m-0 p-0"></div>    
                </div>
                <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border absolute m-0 p-0">
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 absolute m-0 p-0"></div>    
                </div>
            </div>
            <div>
                <h1>hola muindo</h1>
            </div>
        </div>
    `,
    imports: [DropDownMenu]
})

export default class MapSelectorPage implements OnInit {
  

    public selectedTarget = signal<{ dom: HTMLElement,  x: number, y: number } | undefined>(undefined);

    public collection = signal<HTMLCollection | undefined>(undefined);
    public cursor = signal<{x: number, y: number} | undefined>(undefined);


    saveData() {


        const container = document.getElementById("main-container") as HTMLElement;

        const coordinates = [];
        if (container) {
            const childrens = container.children;

            for (const children of childrens) {

                const element = children as HTMLElement;

                const elementChildrens = element.children ;
                const childrenCoordinates = [];
                for (const elementChildren of elementChildrens) {

                    const childrenElement = elementChildren as HTMLElement;

                    childrenCoordinates.push({
                        x: Number(childrenElement.style.left.split("px")[0] || 0),
                        y: Number(childrenElement.style.top.split("px")[0] || 0)
                    });
                }

                coordinates.push({
                    x: Number(element.style.left.split("px")[0] || 0),
                    y: Number(element.style.top.split("px")[0] || 0),
                    children: childrenCoordinates
                });
                
            }

            localStorage.setItem("data", JSON.stringify(coordinates));
        }   
    }


    loadData() {

        const data = (JSON.parse(localStorage.getItem("data") || "[]")) as {x: number, y:number, children: Array<{x: number, y: number}> }[];

        const container = document.getElementById("main-container") as HTMLElement;

        const containerChildren = container.children;

        data.forEach(({ x, y, children }, index) => {

            const element = containerChildren[index] as HTMLElement;

            if (element.dataset['isdraggable'] === "true") {
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            }

            const elementChildren = element.children;

            children.forEach((value, index) =>  {
                const childrenElement = elementChildren[index] as HTMLElement;
                if (childrenElement.dataset['isdraggable'] === "true") {
                    childrenElement.style.left = `${value.x}px`;
                    childrenElement.style.top = `${value.y}px`;
                }
            });

        });

    }

    ngOnInit(): void {
        this.loadData();
    }


    @HostListener('document:mousemove',["$event"])
    onMouseMoveHandler(event: MouseEvent) {



        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const target = this.selectedTarget();
        const cursor = this.cursor();
        const collection = this.collection();


        if (target && target.dom.id === "main-container"  && cursor) {

            target.dom.style.cursor = "grab";


            const distanceX = mouseX - cursor.x;
            const distanceY = mouseY - cursor.y; 


            if (collection) {
                const childs = collection;
                for (const child of childs) {
                    const element = child as HTMLElement;

                    const elementX = Number(element.style.left.split("px")[0] || 0);
                    const elementY = Number(element.style.top.split("px")[0] || 0);

                    const newLeft = elementX + ((distanceX) * 0.03);
                    const newTop = elementY + ((distanceY) * 0.03);


                    element.style.left = newLeft + 'px';
                    element.style.top = newTop + 'px';
                }
            }
            return;
        }

        if (target && cursor) {


            const distanceX = mouseX - cursor.x;
            const distanceY = mouseY - cursor.y; 



            const parentRect = (target.dom.parentNode as HTMLDivElement).getBoundingClientRect();

            // const targetRect = target.dom.getBoundingClientRect();
            


            // const cursorX = event.clientX - parentRect.x;
            // const cursorY = event.clientY - parentRect.y;
            // const realX = (targetRect.x - parentRect.x) + target.dom.offsetWidth;
            // const realY = (targetRect.y - parentRect.y) + target.dom.offsetHeight;


            // if (cursorX >= parentRect.width) {
            //     return;
            // }

            // if (cursorX <= 0) {
            //     return;
            // }

            // if (cursorY >= parentRect.height) {
            //     return;
            // }

            // if (cursorY <= 0) {
            //     return;
            // }   
            // if ((realY >= parentRect.height) && distanceY > 0) {
            //     return;
            // }   
            // if (((realY - target.dom.offsetHeight) <= 0) && distanceY < 0) {
            //     return;
            // }


            // if ((realX >= parentRect.width) && distanceX > 0) {
            //     return;
            // }       
            // if (((realX - target.dom.offsetWidth) <= 0) && distanceX < 0) {
            //     return;
            // }



            const newLeft = target.x + distanceX;

            const newTop = target.y + distanceY;

            if (target.dom.dataset['boundary'] === "true") {
                if (newLeft > parentRect.width -  target.dom.offsetWidth) {
                    return;
                }
                if (newLeft < 0) {
                    return;
                }
                if (newTop > parentRect.height - target.dom.offsetHeight) {
                    return;
                }
                if (newTop < 0) {
                    return;
                }
            }
            target.dom.style.left = (newLeft) + 'px';
            target.dom.style.top = (newTop) + 'px';
            target.dom.style.cursor = "grab";

            this.saveData();
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


        const button = event.button;


        if (button === 1) {

            const target = event.target as HTMLElement;

            if (target.id === "main-container" ) {
                this.cursor.set({ x: event.clientX, y: event.clientY });
                this.selectedTarget.set({ dom: target, x: 0, y:0 });
                this.collection.set(target.children);
                return;
            }
        }



        if (button === 0) {
            
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
}