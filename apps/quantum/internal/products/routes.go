package products

import "github.com/labstack/echo/v4"

func ProductsRoutes(server *echo.Group) {

	handler := NewProductsHandler()

	group := server.Group("/products")

	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
	group.GET("/groups", handler.GetGroups)
	group.GET("", handler.GetPage)

}
