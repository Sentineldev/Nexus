package repositories

import "quantum/internal/types"

type LocalProductRepository struct {
}

func NewLocalRepository() *LocalProductRepository {
	return &LocalProductRepository{}
}

func (repository LocalProductRepository) Save(product types.Product)   {}
func (repository LocalProductRepository) Update(product types.Product) {}
func (repository LocalProductRepository) Delete(id string)             {}
func (repository LocalProductRepository) GetAll()                      {}
func (repository LocalProductRepository) GetById()                     {}
