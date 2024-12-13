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
		Repository:        NewLocalMenuRepository(),
		RestaurantService: restaurants.NewRestaurantService(),
	}
}

func (service MenuService) Save(body SaveMenuDto) error {

	if _, err := service.Repository.GetByName(body.Name); err == nil {
		return echo.ErrConflict
	}

	restaurant, err := service.RestaurantService.Repository.GetById(body.RestaurantId)

	if err != nil {
		return err
	}

	newMenu := types.NewMenu2(uuid.NewString(), body.Name, restaurant)

	if err := service.Repository.Save(*newMenu); err != nil {
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
