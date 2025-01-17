package orders

import "github.com/labstack/echo/v4"

func OrdersRoutes(server *echo.Group) {

	handler := NewOrdersHandler()

	group := server.Group("/orders")

	group.POST("", handler.Save)

}
