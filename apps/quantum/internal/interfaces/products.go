package interfaces

import "quantum/internal/types"

type ProductRepository interface {
	Save(types.Product) error
	Update(types.Product) error
	Delete(string) error
	GetPage(types.PageFilter[any]) types.PageData[types.Product]
	GetById(string) (types.Product, error)
}
