package products

import "backend/types"

type ProductsRepository interface {
	Save(product Product)
	Update(product Product)
	Delete(id string)
	GetPage(filter types.PageFilter[ProductPageFilter]) types.PageData[Product]
	GetById(string) (Product, error)
}

type ProductsServiceInterface interface {
	Save(body SaveProductDto) error
	Update(id string, body SaveProductDto) error
	GetPage(filter types.PageFilter[ProductPageFilter]) types.PageData[Product]
	Delete(id string) error
}
