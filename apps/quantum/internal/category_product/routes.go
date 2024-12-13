package category_product

import "github.com/labstack/echo/v4"

func MenuCategoriesRoutes(server *echo.Group) {

	handler := NewCategoryProductHandler()

	group := server.Group("/category-products")

	group.POST("", handler.Save)
	group.GET("/:categoryId", handler.GetPage)
}
