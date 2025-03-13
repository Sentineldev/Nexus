package category_product

import "quantum/internal/types"

type CategoryProductRepository interface {
	Save(types.CategoryProduct) error
	Update(types.CategoryProduct) error
	Delete(string) error
	GetById(string) (types.CategoryProduct, error)
	GetByProductId(categoryId string, productId string) (types.CategoryProduct, error)
	GetByMenuId(categoryId string, productId string) (types.CategoryProduct, error)
	GetPage(types.PageFilter[CategoryPageFilter]) types.PageData[types.CategoryProduct]
	GetAllProductsPaginate(types.PageFilter[AllProductsFilter]) types.PageData[types.CategoryProduct]
}
