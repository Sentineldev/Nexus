package restaurants

import (
	"github.com/labstack/echo/v4"
)

func RestaurantsRoutes(server *echo.Group) {

	handler := NewRestaurantHandler()

	group := server.Group("/restaurants")

	group.GET("/:id", handler.GetById)
	group.GET("", handler.GetPage)
	group.POST("", handler.Save)
}
