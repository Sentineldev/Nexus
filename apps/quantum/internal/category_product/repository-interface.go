package category_product

import "quantum/internal/types"

type CategoryProductRepository interface {
	Save(types.CategoryProduct) error
	GetByProductId(categoryId string, productId string) (types.CategoryProduct, error)
	GetPage(types.PageFilter[CategoryPageFilter]) types.PageData[types.CategoryProduct]
}
