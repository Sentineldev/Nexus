package menu_category

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalMenuCategoryRepository struct {
}

func NewLocalMenuCategoryRepository() *LocalMenuCategoryRepository {
	return &LocalMenuCategoryRepository{}
}

func (repository LocalMenuCategoryRepository) Save(body types.MenuCategory) error {

	internal.CATEGORIES = append(internal.CATEGORIES, body)

	return nil
}

func (repository LocalMenuCategoryRepository) Update(body types.MenuCategory) error {

	for index, category := range internal.CATEGORIES {
		if category.Id == body.Id {
			internal.CATEGORIES[index] = body
			break
		}
	}

	return nil
}

func (repository LocalMenuCategoryRepository) GetById(id string) (types.MenuCategory, error) {

	for _, v := range internal.CATEGORIES {
		if v.Id == id {
			return v, nil
		}
	}
	return types.MenuCategory{}, errors.New("category not found")
}
func (repository LocalMenuCategoryRepository) GetByName(menuId, name string) (types.MenuCategory, error) {
	for _, v := range internal.CATEGORIES {
		if v.Name == name && v.Menu.Id == menuId {
			return v, nil
		}
	}
	return types.MenuCategory{}, errors.New("category not found")
}

func (repository LocalMenuCategoryRepository) GetAll(menuId string) []types.MenuCategory {

	data := []types.MenuCategory{}

	for _, category := range internal.CATEGORIES {
		if category.Menu.Id == menuId {
			data = append(data, category)
		}
	}

	return data
}
