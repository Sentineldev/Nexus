package types

type CategoryProduct struct {
	Id        string       `json:"id"`
	Product   Product      `json:"product"`
	Category  MenuCategory `json:"category"`
	Price     float64      `json:"price"`
	IsEnabled bool         `json:"isEnabled"`
}

func NewCategoryProduct1(id string, product Product, category MenuCategory, price float64, isEnabled bool) *CategoryProduct {
	return &CategoryProduct{
		Id:        id,
		Product:   product,
		Category:  category,
		Price:     price,
		IsEnabled: isEnabled,
	}
}

func NewCategoryProduct2(id string, product Product, category MenuCategory, price float64) *CategoryProduct {
	return &CategoryProduct{
		Id:        id,
		Product:   product,
		Category:  category,
		Price:     price,
		IsEnabled: false,
	}
}
