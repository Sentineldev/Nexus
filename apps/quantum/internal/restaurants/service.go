package restaurants

import (
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RestaurantService struct {
	Repository RestaurantsRepository
}

func NewRestaurantService() *RestaurantService {

	return &RestaurantService{
		Repository: NewDatabaseRepository(),
	}
}

func (service RestaurantService) Save(body SaveRestaurantDto) error {

	_, err := service.Repository.GetByName(body.Name)

	if err == nil {
		return echo.ErrConflict
	}

	newRestaraunt := types.NewRestaurant(
		uuid.NewString(),
		body.Name,
	)

	err = service.Repository.Save(*newRestaraunt)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service RestaurantService) Update(id string, body UpdateRestaurantServiceBodyDto) error {

	restaurant, err := service.GetById(id)
	if err != nil {
		return err
	}

	if restaurant.Name != body.Name {
		if _, err = service.Repository.GetByName(body.Name); err == nil {
			return echo.ErrConflict
		}
	}
	restaurant.Name = body.Name
	restaurant.IsActive = body.IsActive

	err = service.Repository.Update(restaurant)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func (service RestaurantService) GetById(id string) (types.Restaurant, error) {
	restaurant, err := service.Repository.GetById(id)
	if err != nil {
		return types.Restaurant{}, echo.ErrNotFound
	}

	return restaurant, nil
}

func (service RestaurantService) GetPage(filter types.PageFilter[any]) types.PageData[types.Restaurant] {
	return service.Repository.GetPage(filter)
}
