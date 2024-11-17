package products

import (
	"backend/types"
	"errors"
	"strings"
)

type ProductsRepositoryPostgreSQL struct {
	Products []Product
}

func NewProductsPostgreSQLRepository() *ProductsRepositoryPostgreSQL {
	return &ProductsRepositoryPostgreSQL{
		Products: []Product{},
	}
}
func (repository *ProductsRepositoryPostgreSQL) Save(product Product) {
	repository.Products = append(repository.Products, product)
}

func (repository *ProductsRepositoryPostgreSQL) Update(product Product) {
	productIndex := -1
	for index, value := range repository.Products {
		if value.Id == product.Id {
			productIndex = index
			break
		}
	}
	if productIndex == -1 {
		return
	}
	repository.Products[productIndex] = product
}

func (repository *ProductsRepositoryPostgreSQL) Delete(id string) {

	aux := []Product{}
	for _, product := range repository.Products {

		if product.Id == id {
			continue
		}
		aux = append(aux, product)
	}

	repository.Products = aux
}

func (repository ProductsRepositoryPostgreSQL) GetPage(filter types.PageFilter[ProductPageFilter]) types.PageData[Product] {

	startIndex := (filter.Page - 1) * filter.PageSize
	endIndex := startIndex + filter.PageSize

	aux := []Product{}

	if len(filter.Filter.Name) > 0 {
		for _, product := range repository.Products {
			if strings.EqualFold(strings.ToLower(product.Name), strings.ToLower(filter.Filter.Name)) {
				aux = append(aux, product)
			}
		}
	} else {
		aux = repository.Products
	}

	if endIndex > int64(len(aux)) {
		endIndex = int64(len(aux))
	}
	data := aux[startIndex:endIndex]
	dataSize := int64(len(aux))

	return types.PageData[Product]{
		Meta: types.PageMeta{
			Page:     filter.Page,
			PageSize: filter.PageSize,
			DataSize: dataSize,
		},
		Data: data,
	}
}

func (repository ProductsRepositoryPostgreSQL) GetById(id string) (Product, error) {

	var product Product

	found := false
	for _, value := range repository.Products {
		if value.Id == id {
			product = value
			break
		}
	}
	if !found {
		return product, errors.New("")
	}

	return product, nil

}
