package routes

import (
	"github.com/labstack/echo/v4"
)

func ApiGroup(server *echo.Echo) {

	group := server.Group("/api")
	ProductsRoutes(group)
	RestaurantsRoutes(group)
}
