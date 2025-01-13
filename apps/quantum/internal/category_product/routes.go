package category_product

import "github.com/labstack/echo/v4"

func MenuCategoriesRoutes(server *echo.Group) {

	handler := NewCategoryProductHandler()

	group := server.Group("/category-products")

	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
	group.GET("/all-products/:restaurantId", handler.GetAllProductsPaginate)
	group.GET("/:categoryId", handler.GetPage)
}
