package products

import "github.com/labstack/echo/v4"

func ProductsRoutes(server *echo.Group) *echo.Group {

	handler := NewProductsHandler()

	group := server.Group("/products")

	group.GET("/", handler.GetPage)
	group.POST("/", handler.Save)
	group.PATCH(":id/", handler.Update)
	group.DELETE(":id/", handler.Delete)

	return group
}
