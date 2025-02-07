package menu_category

import (
	"quantum/internal/menus"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type MenuCategoryService struct {
	Repository  MenuCategoryRepository
	MenuService menus.MenuService
}

func NewMenuCategoryService() *MenuCategoryService {

	return &MenuCategoryService{
		Repository:  NewDatabaseRepository(),
		MenuService: *menus.NewMenuService(),
	}
}

func (service MenuCategoryService) Save(body SaveMenuCategoryDto) error {

	if _, err := service.Repository.GetByName(body.MenuId, body.Name); err == nil {
		return echo.ErrConflict
	}

	menu, err := service.MenuService.GetById(body.MenuId)

	if err != nil {
		return err
	}

	newCategory := types.NewCategory(
		uuid.NewString(),
		body.Name,
		menu,
	)
	service.Repository.Save(*newCategory)

	return nil
}

func (service MenuCategoryService) Update(id string, body UpdateMenuCategoryDto) error {

	category, err := service.GetById(id)
	if err != nil {
		return err
	}

	if category.Name != body.Name {
		if _, err := service.Repository.GetByName(category.Menu.Id, body.Name); err == nil {
			return echo.ErrConflict
		}
	}

	category.Name = body.Name
	category.IsActive = body.IsActive

	service.Repository.Update(category)

	return nil
}

func (service MenuCategoryService) GetById(id string) (types.MenuCategory, error) {

	result, err := service.Repository.GetById(id)

	if err != nil {
		return types.MenuCategory{}, echo.ErrNotFound
	}

	return result, nil
}

func (service MenuCategoryService) GetAll(menuId string) []types.MenuCategory {

	result := service.Repository.GetAll(menuId)

	return result
}
