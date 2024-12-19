package types

type CategoryProduct struct {
	Id       string       `json:"id"`
	Product  Product      `json:"product"`
	Category MenuCategory `json:"category"`
	Price    float64      `json:"price"`
	IsActive bool         `json:"isActive"`
}

func NewCategoryProduct1(id string, product Product, category MenuCategory, price float64, isActive bool) *CategoryProduct {
	return &CategoryProduct{
		Id:       id,
		Product:  product,
		Category: category,
		Price:    price,
		IsActive: isActive,
	}
}

func NewCategoryProduct2(id string, product Product, category MenuCategory, price float64) *CategoryProduct {
	return &CategoryProduct{
		Id:       id,
		Product:  product,
		Category: category,
		Price:    price,
		IsActive: false,
	}
}
