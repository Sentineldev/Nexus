package services

import (
	"errors"
	"quantum/internal/dto"
	"quantum/internal/interfaces"
	"quantum/internal/repositories"
	"quantum/internal/types"

	"github.com/google/uuid"
)

type ProductService struct {
	Repository interfaces.ProductRepository
}

func NewProductService() *ProductService {
	return &ProductService{
		Repository: repositories.NewLocalRepository(),
	}
}

func (service ProductService) Save(body dto.SaveProductDto) error {

	id := uuid.New().String()

	newProduct := types.NewProduct(id, body.Name, body.Description)

	if err := service.Repository.Save(*newProduct); err != nil {
		return errors.New("User not created")
	}
	return nil
}

func (service ProductService) GetById(id string) (types.Product, error) {

	result, err := service.Repository.GetById(id)

	if err != nil {
		return result, errors.New("User not found")
	}

	return result, nil
}

func (service ProductService) Update(id string, body dto.SaveProductDto) error {

	product, err := service.GetById(id)
	if err != nil {
		return err
	}
	product.Name = body.Name
	product.Description = body.Description

	err = service.Repository.Update(product)
	if err != nil {
		return errors.New("Can't update product")
	}
	return nil
}

func (service ProductService) Delete(id string) error {

	result := service.Repository.Delete(id)

	if result != nil {
		return errors.New("Can't delete product")
	}
	return nil
}

func (service ProductService) GetPage(filter types.PageFilter[any]) types.PageData[types.Product] {

	return service.Repository.GetPage(filter)
}
