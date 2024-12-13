package category_product

type SaveCategoryProductDto struct {
	ProductId  string  `json:"productId"`
	CategoryId string  `json:"categoryId"`
	Price      float64 `json:"price"`
}

type CategoryPageFilter struct {
	CategoryId string `json:"categoryId"`
}
