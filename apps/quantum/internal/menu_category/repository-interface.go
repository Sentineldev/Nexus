package menu_category

import "quantum/internal/types"

type MenuCategoryRepository interface {
	Save(types.MenuCategory) error
	Update(types.MenuCategory) error
	GetById(id string) (types.MenuCategory, error)
	GetByName(menuId, name string) (types.MenuCategory, error)
	GetAll(menuId string) []types.MenuCategory
}
