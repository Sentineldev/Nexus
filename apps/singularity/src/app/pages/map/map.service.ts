import { Injectable, signal, WritableSignal } from "@angular/core";
import { ContainerElement, MapContainer } from "./types/map_types";


type ServiceState = {
    containers: MapContainer[];
};

@Injectable({
    providedIn: 'root'
})
export default class MapService {



    private state: WritableSignal<ServiceState>;

    constructor() {

        this.state = signal<ServiceState>({
            containers: []
        });
    }



    getState() {

        return this.state();
    }   


    setContainers(containers: MapContainer[]) {
        this.state.update((current) => {


            current.containers = containers;

            return current;
        });
    }


    deleteContainer(container: MapContainer) {

        this.state.update((current) => {
            current.containers = current.containers.filter((val) => val.id !== container.id);

            return current;
        });
        
    }


    updateContainer(container: MapContainer) {
        this.state.update((current) => {

            const index = current.containers.findIndex((val) => val.id === container.id);
            const aux  = current.containers;

            aux[index] = container;

            current.containers = aux;

            return current;
        });
    }

    addContainer(container: MapContainer) {
        this.state.update((current) => {
            current.containers.push(container);

            return current;
        });
    }

    addContainerElement(container: MapContainer, element: ContainerElement) {


        const index = this.state().containers.findIndex((val) => val.id === container.id);

        console.log(index);
        console.log(this.state().containers);

        this.state.update((current) => {


            const aux = current.containers;

            console.log(aux[index]);

            aux[index].elements.push(element);

            current.containers = aux;

            return current;
        })
    }

}