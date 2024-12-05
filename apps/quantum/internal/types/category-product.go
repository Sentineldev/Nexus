package types

type CategoryProduct struct {
	Id        string       `json:"id"`
	Price     float64      `json:"price"`
	Category  MenuCategory `json:"category"`
	Product   Product      `json:"product"`
	IsEnabled bool         `json:"isEnabled"`
}

func NewCategoryProduct(id string, price float64, category MenuCategory, product Product, isEnabled bool) *CategoryProduct {
	return &CategoryProduct{
		Id:        id,
		Price:     price,
		Category:  category,
		Product:   product,
		IsEnabled: isEnabled,
	}
}
