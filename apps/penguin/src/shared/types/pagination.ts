export type PageMeta = {
  page: number;
  pageSize: number;
  dataSize: number;
};

export type PageData<T> = {
  data: T[];
  meta: PageMeta;
};

export type PageFilter<T> = {
  page: number;
  pageSize: number;
  filter: T;
};
