package types

type CategoryProduct struct {
	Id       string       `json:"id"`
	Product  Product      `json:"product"`
	Category MenuCategory `json:"category"`
	Price    float64      `json:"price"`
	Count    int64        `json:"count"`
	IsActive bool         `json:"isActive"`
}

func (product CategoryProduct) GetMenuId() string {
	return product.Category.Menu.Id
}

func (product CategoryProduct) GetCategoryId() string {
	return product.Category.Id
}

func (product CategoryProduct) GetRestaurantId() string {
	return product.Category.Menu.Restaurant.Id
}

func NewCategoryProduct1(id string, product Product, category MenuCategory, price float64, count int64, isActive bool) *CategoryProduct {
	return &CategoryProduct{
		Id:       id,
		Product:  product,
		Category: category,
		Price:    price,
		Count:    count,
		IsActive: isActive,
	}
}

func NewCategoryProduct2(id string, product Product, category MenuCategory, price float64, count int64) *CategoryProduct {
	return &CategoryProduct{
		Id:       id,
		Product:  product,
		Category: category,
		Price:    price,
		Count:    count,
		IsActive: false,
	}
}
