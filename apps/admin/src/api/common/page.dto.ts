export type PageFilter = {
    Page: number;
    PageSize: number;
};

export type PageMeta = {
    Page: number;
    PageSize: number;
    DataSize: number;
};

export type PageData<T> = {
    Meta: PageMeta;
    Data: T[];
};