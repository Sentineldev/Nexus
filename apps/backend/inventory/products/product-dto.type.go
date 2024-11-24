package products

type SaveProductDto struct {
	Name string `json:"name"`
}

type ProductPageFilter struct {
	Name string
}
