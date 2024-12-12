package routes

import (
	"quantum/internal/handlers"

	"github.com/labstack/echo/v4"
)

func RestaurantsRoutes(server *echo.Group) {

	handler := handlers.NewRestaurantHandler()

	group := server.Group("/restaurants")

	group.GET("", handler.GetPage)
	group.POST("", handler.Save)
}
