package feed_stock

import "github.com/labstack/echo/v4"

func FeedStockRoutes(server *echo.Group) {

	handler := NewFeedStockHandler()

	group := server.Group("/feed-stock")

	group.GET("", handler.GetPage)
	group.POST("", handler.Save)
	group.PUT("/:id", handler.Update)
	group.DELETE("/:id", handler.Delete)
}
