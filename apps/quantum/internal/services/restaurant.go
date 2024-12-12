package services

import (
	"quantum/internal/dto"
	"quantum/internal/interfaces"
	"quantum/internal/repositories"
	"quantum/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RestaurantService struct {
	Repository interfaces.RestaurantsRepository
}

func NewRestaurantService() *RestaurantService {

	return &RestaurantService{
		Repository: repositories.NewLocalRestaurantRepository(),
	}
}

func (service RestaurantService) Save(body dto.SaveRestaurantDto) error {

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

func (service RestaurantService) GetPage(filter types.PageFilter[any]) types.PageData[types.Restaurant] {
	return service.Repository.GetPage(filter)
}
