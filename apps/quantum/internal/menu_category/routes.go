package menu_category

import "github.com/labstack/echo/v4"

func MenuCategoriesRoutes(server *echo.Group) {

	handler := NewMenuCategoryHandler()

	group := server.Group("/menu-categories")

	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.GET("/by-id/:id", handler.GetById)
	group.GET("/all/:menuId", handler.GetAll)
}
