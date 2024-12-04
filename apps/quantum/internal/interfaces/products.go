package interfaces

import "quantum/internal/types"

type ProductRepository interface {
	Save(types.Product)
	Update(types.Product)
	Delete(string)
	GetAll()
	GetById()
}
