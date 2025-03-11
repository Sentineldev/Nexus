package menus

import (
	"quantum/internal/restaurants"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type MenuService struct {
	Repository        MenuRepository
	RestaurantService *restaurants.RestaurantService
}

func NewMenuService() *MenuService {

	return &MenuService{
		Repository:        NewDatabaseRepository(),
		RestaurantService: restaurants.NewRestaurantService(),
	}
}

func (service MenuService) Save(body SaveMenuDto) error {

	if _, err := service.Repository.GetByName(body.RestaurantId, body.Name); err == nil {
		return echo.ErrConflict
	}

	restaurant, err := service.RestaurantService.Repository.GetById(body.RestaurantId)

	if err != nil {
		return err
	}

	newMenu := types.NewMenu(uuid.NewString(), body.Name, restaurant)

	if err := service.Repository.Save(*newMenu); err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service MenuService) Update(id string, body UpdateMenuServiceBodyDto) error {

	menu, err := service.getById(id)

	if err != nil {
		return err
	}
	if body.Name != menu.Name {
		if _, err := service.Repository.GetByName(menu.Restaurant.Id, body.Name); err == nil {
			return echo.ErrConflict
		}
	}
	menu.Name = body.Name
	menu.IsActive = body.IsActive

	if err := service.Repository.Update(menu); err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service MenuService) Delete(id string) error {

	err := service.Repository.Delete(id)

	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service MenuService) GetById(id string) (types.Menu, error) {

	result, err := service.Repository.GetById(id)
	if err != nil {
		return types.Menu{}, echo.ErrNotFound
	}

	return result, nil
}

func (service MenuService) GetAll(restaurantId string) []types.Menu {

	return service.Repository.GetAll(restaurantId)
}

func (service MenuService) getById(menuId string) (types.Menu, error) {

	result, err := service.Repository.GetById(menuId)
	if err != nil {
		return types.Menu{}, echo.ErrNotFound
	}
	return result, nil
}
