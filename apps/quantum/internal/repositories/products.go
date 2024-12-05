package repositories

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalProductRepository struct {
}

func NewLocalRepository() *LocalProductRepository {
	return &LocalProductRepository{}
}

func (repository LocalProductRepository) Save(product types.Product) error {
	internal.PRODUCTS = append(internal.PRODUCTS, product)

	return nil
}
func (repository LocalProductRepository) Update(product types.Product) error {

	productIndex := -1
	for index, val := range internal.PRODUCTS {
		if product.Id == val.Id {
			productIndex = index
			break
		}
	}
	if productIndex != -1 {
		internal.PRODUCTS[productIndex] = product

		return nil
	}

	return errors.New("Product not found")
}
func (repository LocalProductRepository) Delete(id string) error {

	aux := []types.Product{}
	for _, val := range internal.PRODUCTS {
		if val.Id == id {
			continue
		}
		aux = append(aux, val)
	}
	internal.PRODUCTS = aux
	return nil
}
func (repository LocalProductRepository) GetPage(filter types.PageFilter[any]) types.PageData[types.Product] {

	data := types.PageData[types.Product]{}

	data.Data = []types.Product{}
	data.Meta = types.PageMeta{
		Page:     filter.Page,
		PageSize: filter.PageSize,
		DataSize: int64(len(internal.PRODUCTS)),
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
	if startIndex >= int64(len(internal.PRODUCTS)) {
		return data
	}

	// Calculamos el índice final (teniendo en cuenta el tamaño del arreglo)
	endIndex := min(startIndex+pageSize, int64(len(internal.PRODUCTS)))

	// Retornamos la porción paginada del arreglo
	data.Data = internal.PRODUCTS
	if len(internal.PRODUCTS) == 0 {
		data.Data = internal.PRODUCTS[startIndex:endIndex]
	}

	return data
}
func (repository LocalProductRepository) GetById(id string) (types.Product, error) {
	for _, val := range internal.PRODUCTS {
		if val.Id == id {
			return val, nil
		}
	}
	return types.Product{}, errors.New("Product not found")
}
