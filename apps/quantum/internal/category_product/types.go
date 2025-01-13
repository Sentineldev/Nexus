package category_product

type SaveCategoryProductDto struct {
	ProductId  string  `json:"productId"`
	CategoryId string  `json:"categoryId"`
	Price      float64 `json:"price"`
}

type UpdateCategoryProductDto struct {
	Price    float64 `json:"price"`
	IsActive bool    `json:"isActive"`
}

type CategoryPageFilter struct {
	CategoryId string `json:"categoryId"`
}

type AllProductsFilter struct {
	RestaurantId string `json:"restaurantId"`
}
