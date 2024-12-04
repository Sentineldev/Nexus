package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type RestaurantsHandler struct {
}

func NewRestaurantHandler() *RestaurantsHandler {
	return &RestaurantsHandler{}
}

func (handler RestaurantsHandler) GetRestaurants(context echo.Context) error {

	return context.String(http.StatusOK, "Get all restaurants")
}
