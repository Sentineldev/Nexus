package products

import (
	"errors"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ProductService struct {
	Repository ProductRepository
}

func NewProductService() *ProductService {
	return &ProductService{
		Repository: NewLocalRepository(),
	}
}

func (service ProductService) Save(body SaveProductDto) error {

	id := uuid.New().String()

	newProduct := types.NewProduct(id, body.Name, body.Description)

	if err := service.Repository.Save(*newProduct); err != nil {
		return echo.ErrInternalServerError
	}
	return nil
}

func (service ProductService) GetById(id string) (types.Product, error) {

	result, err := service.Repository.GetById(id)

	if err != nil {
		return result, echo.ErrNotFound
	}

	return result, nil
}

func (service ProductService) Update(id string, body SaveProductDto) error {

	product, err := service.GetById(id)
	if err != nil {
		return err
	}
	product.Name = body.Name
	product.Description = body.Description

	err = service.Repository.Update(product)
	if err != nil {
		return errors.New("can't update product")
	}
	return nil
}

func (service ProductService) Delete(id string) error {

	result := service.Repository.Delete(id)

	if result != nil {
		return errors.New("can't delete product")
	}
	return nil
}

func (service ProductService) GetPage(filter types.PageFilter[any]) types.PageData[types.Product] {

	return service.Repository.GetPage(filter)
}
