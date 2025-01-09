package clients

import "github.com/labstack/echo/v4"

func ClientsRoutes(server *echo.Group) {

	handler := NewClientHandler()

	group := server.Group("/clients")

	group.GET("/:identification", handler.GetByIdentification)
	group.GET("", handler.GetPage)
	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
}
