package menus

import (
	"github.com/labstack/echo/v4"
)

func MenusRoutes(server *echo.Group) {

	handler := NewMenuHandler()

	group := server.Group("/menus")

	group.GET("/:restaurantId", handler.GetAll)
	group.POST("", handler.Save)
}
