package category_product

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalCategoryProductRepository struct{}

func NewLocalCategoryProductRepository() *LocalCategoryProductRepository {
	return &LocalCategoryProductRepository{}
}

func (repository LocalCategoryProductRepository) Save(body types.CategoryProduct) error {

	internal.CATEGORY_PRODUCTS = append(internal.CATEGORY_PRODUCTS, body)
	return nil
}

func (repository LocalCategoryProductRepository) GetByProductId(categoryId, productId string) (types.CategoryProduct, error) {

	for _, product := range internal.CATEGORY_PRODUCTS {
		if product.Product.Id == productId && product.Category.Id == categoryId {
			return product, nil
		}
	}

	return types.CategoryProduct{}, errors.New("product not found")
}
func (repository LocalCategoryProductRepository) GetPage(filter types.PageFilter[CategoryPageFilter]) types.PageData[types.CategoryProduct] {

	data := types.PageData[types.CategoryProduct]{}

	filtered := []types.CategoryProduct{}
	for _, category := range internal.CATEGORY_PRODUCTS {

		if category.Category.Id == filter.Filter.CategoryId {
			filtered = append(filtered, category)
		}

	}
	data.Data = []types.CategoryProduct{}
	data.Meta = types.PageMeta{
		Page:     filter.Page,
		PageSize: filter.PageSize,
		DataSize: int64(len(filtered)),
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
	if startIndex >= int64(len(filtered)) {
		return data
	}

	// Calculamos el índice final (teniendo en cuenta el tamaño del arreglo)
	endIndex := min(startIndex+pageSize, int64(len(filtered)))

	// Retornamos la porción paginada del arreglo
	data.Data = filtered
	if len(filtered) == 0 {
		data.Data = filtered[startIndex:endIndex]
	}

	return data
}
