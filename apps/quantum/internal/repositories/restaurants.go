package repositories

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalRestaurantsRepository struct{}

func NewLocalRestaurantRepository() *LocalRestaurantsRepository {

	return &LocalRestaurantsRepository{}
}

func (repository LocalRestaurantsRepository) Save(body types.Restaurant) error {

	internal.RESTAURANTS = append(internal.RESTAURANTS, body)

	return nil
}
func (repository LocalRestaurantsRepository) Update(body types.Restaurant) error {
	return nil
}
func (repository LocalRestaurantsRepository) Delete(id string) error {
	return nil
}

func (repository LocalRestaurantsRepository) GetById(id string) (types.Restaurant, error) {

	result := types.Restaurant{}
	return result, nil
}

func (repository LocalRestaurantsRepository) GetByName(name string) (types.Restaurant, error) {
	result := types.Restaurant{}

	for _, v := range internal.RESTAURANTS {
		if v.Name == name {
			return v, nil
		}
	}

	return result, errors.New("restaurant not found")
}

func (repository LocalRestaurantsRepository) GetPage(filter types.PageFilter[any]) types.PageData[types.Restaurant] {

	data := types.PageData[types.Restaurant]{}

	data.Data = []types.Restaurant{}
	data.Meta = types.PageMeta{
		Page:     filter.Page,
		PageSize: filter.PageSize,
		DataSize: int64(len(internal.RESTAURANTS)),
	}

	page := filter.Page
	pageSize := filter.PageSize

	// Validamos los parámetros de entrada
	if page <= 0 || pageSize <= 0 {
		return data
	}

	// Calculamos el índice de inicio
	startIndex := (page - 1) * pageSize

	// Verificamos si el índice de inicio excede el tamaño del arreglo
	if startIndex >= int64(len(internal.RESTAURANTS)) {
		return data
	}

	// Calculamos el índice final (teniendo en cuenta el tamaño del arreglo)
	endIndex := min(startIndex+pageSize, int64(len(internal.RESTAURANTS)))

	// Retornamos la porción paginada del arreglo
	data.Data = internal.RESTAURANTS
	if len(internal.RESTAURANTS) == 0 {
		data.Data = internal.RESTAURANTS[startIndex:endIndex]
	}

	return data
}
