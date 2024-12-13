package routes

import (
	"quantum/internal/category_product"
	"quantum/internal/menu_category"
	"quantum/internal/menus"
	"quantum/internal/products"
	"quantum/internal/restaurants"

	"github.com/labstack/echo/v4"
)

func ApiGroup(server *echo.Echo) {

	group := server.Group("/api")
	products.ProductsRoutes(group)
	restaurants.RestaurantsRoutes(group)
	menus.MenusRoutes(group)
	menu_category.MenuCategoriesRoutes(group)
	category_product.MenuCategoriesRoutes(group)
}
