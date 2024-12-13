package menu_category

import "github.com/labstack/echo/v4"

func MenuCategoriesRoutes(server *echo.Group) {

	handler := NewMenuCategoryHandler()

	group := server.Group("/menu-categories")

	group.POST("", handler.Save)
	group.GET("/:id", handler.GetById)
}
