package handlers

import (
	"net/http"
	"quantum/internal/dto"
	"quantum/internal/services"
	"quantum/internal/types"

	"github.com/labstack/echo/v4"
)

type RestaurantsHandler struct {
	Service services.RestaurantService
}

func NewRestaurantHandler() *RestaurantsHandler {
	return &RestaurantsHandler{
		Service: *services.NewRestaurantService(),
	}
}
func (handler RestaurantsHandler) Save(context echo.Context) error {

	body := dto.SaveRestaurantDto{}

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
