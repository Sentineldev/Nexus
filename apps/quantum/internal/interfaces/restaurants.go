package interfaces

import "quantum/internal/types"

type RestaurantsRepository interface {
	Save(types.Restaurant) error
	Delete(string) error
	Update(types.Restaurant) error
	GetById(string) (types.Restaurant, error)
	GetByName(string) (types.Restaurant, error)
	GetPage(types.PageFilter[any]) types.PageData[types.Restaurant]
}
