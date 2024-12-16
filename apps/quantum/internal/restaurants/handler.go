package restaurants

import (
	"net/http"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type RestaurantsHandler struct {
	Service RestaurantService
}

func NewRestaurantHandler() *RestaurantsHandler {
	return &RestaurantsHandler{
		Service: *NewRestaurantService(),
	}
}
func (handler RestaurantsHandler) Save(context echo.Context) error {

	body := SaveRestaurantDto{}

	context.Bind(&body)

	if err := handler.Service.Save(body); err != nil {
		return err
	}

	return context.JSON(http.StatusCreated, "")
}
func (handler RestaurantsHandler) GetPage(context echo.Context) error {

	pageFilter := types.PageFilter[any]{
		Page:     1,
		PageSize: 5,
	}
	result := handler.Service.GetPage(pageFilter)
	return context.JSON(http.StatusOK, result)
}

func (handler RestaurantsHandler) GetById(context echo.Context) error {

	id := context.Param("id")

	result, err := handler.Service.GetById(id)

	if err != nil {
		return err
	}
	return context.JSON(http.StatusOK, result)
}
