package menus

import (
	"errors"
	"quantum/internal"
	"quantum/internal/types"
)

type LocalMenuRepository struct{}

func NewLocalMenuRepository() *LocalMenuRepository {
	return &LocalMenuRepository{}
}

func (repository LocalMenuRepository) Save(body types.Menu) error {
	internal.MENUS = append(internal.MENUS, body)
	return nil
}

func (repository LocalMenuRepository) Update(body types.Menu) error {

	for index, v := range internal.MENUS {
		if v.Id == body.Id {
			internal.MENUS[index] = body
			break
		}

	}

	return nil
}

func (repository LocalMenuRepository) Delete(id string) error {

	menus := []types.Menu{}
	for _, v := range internal.MENUS {
		if v.Id != id {
			menus = append(menus, v)
		}
	}
	internal.MENUS = menus
	return nil
}

func (repository LocalMenuRepository) GetById(id string) (types.Menu, error) {
	for _, v := range internal.MENUS {
		if v.Id == id {
			return v, nil
		}
	}
	return types.Menu{}, errors.New("menu not found")
}

func (repository LocalMenuRepository) GetByName(name string) (types.Menu, error) {

	for _, v := range internal.MENUS {
		if v.Name == name {
			return v, nil
		}
	}
	return types.Menu{}, errors.New("menu not found")
}

func (repository LocalMenuRepository) GetAll(restaurantId string) []types.Menu {

	aux := []types.Menu{}

	for _, menu := range internal.MENUS {

		if menu.Restaurant.Id == restaurantId {

			for _, category := range internal.CATEGORIES {
				if category.Menu.Id == menu.Id {
					menu.Categories = append(menu.Categories, types.MenuCategoryShort{
						Id:   category.Id,
						Name: category.Name,
					})
				}
			}

			aux = append(aux, menu)
		}
	}

	return aux
}
