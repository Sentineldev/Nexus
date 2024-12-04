package types

type PageData[T any] struct {
	Data []T
	Meta PageMeta
}

type PageMeta struct {
	Page     int64 `json:"page"`
	PageSize int64 `json:"pageSize"`
	DataSize int64 `json:"dataSize"`
}

type PageFilter[T any] struct {
	Page     int64 `json:"page"`
	PageSize int64 `json:"pageSize"`
	Filter   T     `json:"filter"`
}
