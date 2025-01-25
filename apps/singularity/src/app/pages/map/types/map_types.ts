export type ElementProperties = {
    width: number;
    height: number;
    color: string;
    posX: number;
    posY: number;
    isDraggable: boolean;
    boundary: boolean;
    type: string;
};

export type MapContainer = {
    id: string;
    properties: ElementProperties;
    elements: ContainerElement[];
    label: string;
};

export type ContainerElement = {
    id: string;
    properties: ElementProperties;
    label: string;
};