import { Component, computed, HostListener, input, OnInit, signal } from "@angular/core";
import DropDownMenu from "./drop-down-menu";
import DialogToggler from "../../shared/dialog/dialog-toggler";
import MapService from "./map.service";
import CreateMapContainerModal from "./modals/create-map-container-modal";
import { MapContainer } from "./types/map_types";
import CreateContainerElementModal from "./modals/create-container-element";
import DeleteMapContainerModal from "./modals/delete-container-modal";
import EditMapContainerModal from "./modals/edit-map-container-modal";
import ContainerElementsModal from "./modals/container-elements-modal";

@Component({
    selector: `app-map-selector`,
    template: `
        <app-create-map-container-modal [dialogId]="createTableDialogId()"/>
        <app-dialog-toggler [dialogId]="createTableDialogId()">
            <button type="button" class="p-3 bg-slate-700 text-white rounded-lg m-2">Crear Contenedor</button>
        </app-dialog-toggler>
        <div class="flex items-center h-full justify-center p-2">
            <div id="main-container" class="w-full h-full rounded-lg bg-slate-100 border relative overflow-hidden">
                
                @for (container of mapState().containers; track container.id) {
                    <app-create-container-element-modal [container]="container"/>
                    <app-delete-map-container-modal [container]="container"/>
                    <app-edit-map-container-modal [container]="container"/>
                    <app-container-elements-modal [container]="container"/>
                    <div 
                        draggable="false"
                        [id]="container.id"
                        style="borderColor:{{container.properties.color}}; width: {{container.properties.width}}px; height: {{container.properties.height}}px; left: {{container.properties.posX}}px; top: {{container.properties.posY}}px;"
                        class="map-element border" 
                        oncontextmenu="return false" 
                        data-isDraggable="true" 
                        data-boundary="false"
                        data-type="container" >
                        <div data-isDropdown="true" data-isDraggable="false" class="absolute top-[-30px] flex gap-2 items-center">
                            <app-dropdown-menu>
                                <app-dialog-toggler [dialogId]="'unique-modal-to-add-element-'+container.id">
                                    <h1 class="text-white p-2">Agregar elemento</h1>
                                </app-dialog-toggler>
                                <app-dialog-toggler [dialogId]="'unique-modal-to-edit-container-'+container.id">
                                    <h1 class="text-white p-2">Modificar</h1>
                                </app-dialog-toggler>
                                <app-dialog-toggler [dialogId]="'some-unique-display-for-elements-'+container.id">
                                    <h1 class="text-white p-2">Elementos</h1>
                                </app-dialog-toggler>
                                <app-dialog-toggler [dialogId]="'delete-map--container-modal-unique-'+container.id">
                                    <h1 class="text-white p-2">Eliminar</h1>
                                </app-dialog-toggler>
                            </app-dropdown-menu>
                            <p class="text-slate-700">{{container.label}}</p>
                        </div>
                        @for (element of container.elements; track $index) {
                            <div [id]="element.id"
                            draggable="false"
                            data-boundary="true"
                            data-type="element" 
                            data-isDraggable="true" 
                            class="map-element flex items-center justify-center"
                            style="color:{{element.properties.fontColor}}; border-radius:{{element.properties.borderRadius}}px; width: {{element.properties.width}}px; height: {{element.properties.height}}px; backgroundColor:{{element.properties.color}}; left: {{element.properties.posX}}px; top: {{element.properties.posY}}px;"
                            
                            >
                            <span class="text-center text-sm">{{element.label}}</span>
                        </div>
                        }
                    </div>
                }
                <!-- <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border absolute m-0 p-0">
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 absolute m-0 p-0"></div>    
                </div> -->
                <!-- <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border map-element">
                    <div data-isDraggable="false" class="absolute top-[-30px]">
                        <app-dropdown-menu>
                            <h1>hola mundo</h1>
                        </app-dropdown-menu>
                    </div>
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 map-element"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 map-element"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 map-element"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 map-element"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 map-element"></div>    
                </div> -->
                <!-- <div oncontextmenu="return false" data-isDraggable="true" class="h-32 w-64 bg-transparent border absolute m-0 p-0">
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>  
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-8 bg-red-600 absolute m-0 p-0"></div>    
                    <div draggable="false" data-boundary="true" data-isDraggable="true" class="h-8 w-32 bg-red-600 absolute m-0 p-0"></div>    
                </div> -->
            </div>
        </div>
    `,
    styleUrl: `./map.css`,
    imports: [DropDownMenu, DialogToggler, CreateMapContainerModal, CreateContainerElementModal, DeleteMapContainerModal, EditMapContainerModal, ContainerElementsModal]
})
export default class MapSelectorPage implements OnInit {
  

    public createTableDialogId = signal<string>("create-map-container-modal-unique");
    public selectedTarget = signal<{ dom: HTMLElement,  x: number, y: number } | undefined>(undefined);

    public collection = signal<HTMLCollection | undefined>(undefined);
    public cursor = signal<{x: number, y: number} | undefined>(undefined);


    public mapState = computed(() => this.mapService.getState());


    constructor(
        private readonly mapService: MapService
    ) {}

    saveData() {    


        localStorage.setItem("data", JSON.stringify(this.mapState().containers));

        // const container = document.getElementById("main-container") as HTMLElement;

        // const coordinates = [];
        // if (container) {
        //     const childrens = container.children;

        //     for (const children of childrens) {

        //         const element = children as HTMLElement;

        //         const elementChildrens = element.children ;
        //         const childrenCoordinates = [];
        //         for (const elementChildren of elementChildrens) {

        //             const childrenElement = elementChildren as HTMLElement;

        //             childrenCoordinates.push({
        //                 x: Number(childrenElement.style.left.split("px")[0] || 0),
        //                 y: Number(childrenElement.style.top.split("px")[0] || 0)
        //             });
        //         }

        //         coordinates.push({
        //             x: Number(element.style.left.split("px")[0] || 0),
        //             y: Number(element.style.top.split("px")[0] || 0),
        //             children: childrenCoordinates
        //         });
                
        //     }

        //     localStorage.setItem("data", JSON.stringify(coordinates));
        // }   
    }


    loadData() {



        const data = JSON.parse(localStorage.getItem("data") || "[]");


        this.mapService.setContainers(data as MapContainer[]);
        
        // const data = (JSON.parse(localStorage.getItem("data") || "[]")) as {x: number, y:number, children: Array<{x: number, y: number}> }[];

        // const container = document.getElementById("main-container") as HTMLElement;

        // const containerChildren = container.children;

        // data.forEach(({ x, y, children }, index) => {

        //     const element = containerChildren[index] as HTMLElement;

        //     if (element.dataset['isdraggable'] === "true") {
        //         element.style.left = `${x}px`;
        //         element.style.top = `${y}px`;
        //     }

        //     const elementChildren = element.children;

        //     children.forEach((value, index) =>  {
        //         const childrenElement = elementChildren[index] as HTMLElement;
        //         if (childrenElement.dataset['isdraggable'] === "true") {
        //             childrenElement.style.left = `${value.x}px`;
        //             childrenElement.style.top = `${value.y}px`;
        //         }
        //     });

        // });

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


            if (target.dom.dataset['type'] === "container") {
                const result = this.mapState().containers.findIndex((container) => container.id === target.dom.id);
                this.mapState().containers[result].properties.posX = newLeft;
                this.mapState().containers[result].properties.posY = newTop;
            }

            if (target.dom.dataset['type'] === "element") {
                const parent = target.dom.parentElement;
                if (parent) {
                    const parentId = parent.id; 
                    const containerIndex = this.mapState().containers.findIndex((container) => container.id === parentId);

                    const elementIndex = this.mapState().containers[containerIndex].elements.findIndex((element) => element.id === target.dom.id);
                    this.mapState().containers[containerIndex].elements[elementIndex].properties.posX = newLeft; 
                    this.mapState().containers[containerIndex].elements[elementIndex].properties.posY = newTop;
                }
            }


            

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