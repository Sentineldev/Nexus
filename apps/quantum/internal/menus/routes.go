package menus

import (
	"github.com/labstack/echo/v4"
)

func MenusRoutes(server *echo.Group) {

	handler := NewMenuHandler()

	group := server.Group("/menus")

	group.GET("/all/:restaurantId", handler.GetAll)
	group.GET("/by-id/:menuId", handler.getById)
	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
}
