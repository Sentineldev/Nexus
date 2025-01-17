package routes

import (
	"quantum/internal/auth"
	"quantum/internal/category_product"
	"quantum/internal/clients"
	"quantum/internal/menu_category"
	"quantum/internal/menus"
	"quantum/internal/orders"
	"quantum/internal/products"
	"quantum/internal/restaurants"
	"quantum/internal/users"

	"github.com/labstack/echo/v4"
)

func ApiGroup(server *echo.Echo) {

	group := server.Group("/api")

	auth.AuthRoutes(group)
	products.ProductsRoutes(group)
	restaurants.RestaurantsRoutes(group)
	menus.MenusRoutes(group)
	menu_category.MenuCategoriesRoutes(group)
	category_product.MenuCategoriesRoutes(group)
	users.UsersRoutes(group)
	clients.ClientsRoutes(group)
	orders.OrdersRoutes(group)
}
