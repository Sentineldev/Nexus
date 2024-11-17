package types

// Estructuras para facilitar la definicion de estructuras de respuesta en la API con paginacion. De manera de estandarizar la respuesta.
// El PageMeta define los datos de la paginacion.
// PageFilter es una estandarizacion donde se tienen los campos que siempre son necesarios para filtrar con paginacion.
// Y un campo Filter adicional donde se consideran campos adicionales para filtrar.
type PageMeta struct {
	Page     int64
	PageSize int64
	DataSize int64
}

type PageData[T any] struct {
	Data []T
	Meta PageMeta
}

type PageFilter[T any] struct {
	Page     int64
	PageSize int64
	Filter   T
}
