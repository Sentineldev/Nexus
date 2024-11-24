package products

import (
	"backend/types"

	"github.com/labstack/echo/v4"
)

type ProductsService struct {
	Repository ProductsRepository
}

func NewProductsService() *ProductsService {

	return &ProductsService{
		Repository: NewProductsPostgreSQLRepository(),
	}
}

func (service ProductsService) GetPage(filter types.PageFilter[ProductPageFilter]) types.PageData[Product] {

	return service.Repository.GetPage(filter)
}

func (service ProductsService) Save(body SaveProductDto) error {

	newProduct := NewProduct(
		"1",
		body.Name,
	)
	service.Repository.Save(newProduct)

	return nil
}

func (service ProductsService) Update(id string, body SaveProductDto) error {

	product, err := service.Repository.GetById(id)

	if err != nil {
		return echo.ErrNotFound
	}

	service.Repository.Update(product)
	return nil

}

func (service ProductsService) Delete(id string) error {
	service.Repository.Delete(id)

	return nil
}
