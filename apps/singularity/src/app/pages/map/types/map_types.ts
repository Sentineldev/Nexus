export type ElementProperties = {
    width: number;
    height: number;
    color: string;
    fontColor: string;
    posX: number;
    posY: number;
    type: string;
    borderRadius: number;
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