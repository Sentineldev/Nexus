package routes

import (
	"quantum/internal/handlers"

	"github.com/labstack/echo/v4"
)

func ProductsRoutes(server *echo.Group) {

	handler := handlers.NewProductsHandler()

	group := server.Group("/products")

	group.GET("", handler.GetProducts)

}
